// Function to update ratings for all users in the spreadsheet
function updateleetcodeRatings(
  sheetId='1LmJf7SquwoTrQVSmMOpfpvqxJYermuvDNJ3IksWjUfw', sheetName='botdata')  {

  try {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    if (!sheet) {
      throw new Error("Sheet '" + sheetName + "' not found.");
    }

    var lastRow = sheet.getLastRow();
    if (lastRow == 0) {
      Logger.log("Sheet '" + sheetName + "' is empty.");
      return;
    }

    var range = sheet.getRange("A2:W" + (lastRow + 1));
    var data = range.getValues();

    // Loop through each row and update ratings
    for (var i = 0; i < data.length; i++) {
      
      var leetcodeHandle = data[i][1];

      

      // Update LeetCode rating
      
      var leetcodeHandle = data[i][1];


      var leetcodeInfo = getleetcodeInfo(leetcodeHandle);

      if (leetcodeInfo  !== null) {
        sheet.getRange(i + 2, 3).setValue(leetcodeInfo.noOfContests);
        sheet.getRange(i + 2, 4).setValue(leetcodeInfo.latestcontestoflc);
        sheet.getRange(i + 2, 5).setValue(leetcodeInfo.contestName);
        sheet.getRange(i + 2, 6).setValue(leetcodeInfo.latestrank );
        sheet.getRange(i + 2, 7).setValue(leetcodeInfo.prevrating);
        sheet.getRange(i + 2, 8).setValue(leetcodeInfo.latestrating);        
        sheet.getRange(i + 2, 9).setValue(leetcodeInfo.ratingchange);
        
      }



      // Sleep for 1 second to avoid rate limiting
      Utilities.sleep(1000);
    }
      
  } catch (error) {
    Logger.log("Error updating ratings: " + error);
  }
}
// Function to fetch LeetCode user's rating using GraphQL
function getleetcodeInfo(handle) {
  try {

    var apiUrl = 'https://leetcode.com/graphql';
var query = `
query {   userContestRanking(username: "${handle}"){
        attendedContestsCount
        rating
      }
      userContestRankingHistory(username: "${handle}" ){
        attended
        problemsSolved
        rating
        ranking
        contest 
        {
          title
        }
      }
}
`;
    var payload = JSON.stringify({ query: query });
    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: payload,
    };

    var response = UrlFetchApp.fetch(apiUrl, options);

    if (response.getResponseCode() === 200) {

      var content = response.getContentText();

      var data = JSON.parse( content);

      var data =data.data;
      Logger.log(Object.keys(data))
      var contests = data.userContestRankingHistory;
      var contestsgivencheck=  data.userContestRanking;
      if (contestsgivencheck===null && contests !== null){
        var info = {
          contestName : "Hasen't given one yet",
          latestrating : 0,
          prevrating : 0,
          ratingchange : 0,
          latestrank : "Hasen't given one yet",
          noOfContests : 0,
          latestcontestoflc : false
        }
        return info;
      }
      var noofattended = data.userContestRanking.attendedContestsCount;
      var length =contests.length ;

      if(noofattended >0){
        for(var i=length -1; i>=0 ; i--){
          if(contests[i].attended){
            var latest=contests[i];
            Logger.log(Object.keys(contests[i]))
            var z=i
            break;
          }
        }
      

        if (noofattended  < 2 ){
          var prev = { rating : '1500' }
        }
        else{
        for(var i=z-1; i>=0 ; i--){
          if(contests[i].attended){
            var prev={
              rating : contests[i].rating
              }

            break;
          }
        }
        }
        var info = {
          contestName : latest.contest.title ,
          latestrating : Math.floor(latest.rating),
          prevrating : Math.floor(prev.rating),
          ratingchange : parseInt(latest.rating )- parseInt(prev.rating),
          latestrank : latest.ranking,
          noOfContests :noofattended,
          latestcontestoflc : contests[length-1].attended
        }
      }
      else{
         var info = {
          contestName : "Hasen't given one yet",
          latestrating : 0,
          prevrating : 0,
          ratingchange : 0,
          latestrank : "Hasen't given one yet",
          noOfContests : noofattended,
          latestcontestoflc : contests[contests.length-1].attended
        }
      }

      
      return info;
    } else {
      
      var info = {
          contestName : "wrong account name",
          latestrating : "wrong account name",
          prevrating : "wrong account name",
          ratingchange : "wrong account name",
          latestrank : "wrong account name",
          noOfContests : "wrong account name",
          latestcontestoflc : "wrong account name"
        }
        return info;
    }
  } catch (error) {
    Logger.log("Error fetching leetcode rating: " + error);
    var info = {
          contestName : "wrong account name",
          latestrating : "wrong account name",
          prevrating : "wrong account name",
          ratingchange : "wrong account name",
          latestrank : "Hasen't given one yet",
          noOfContests : "wrong account name",
          latestcontestoflc : "wrong account name"
        }
        return info;
  }
}
