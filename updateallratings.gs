// Function to update ratings for all users in the spreadsheet
function updateallRatings(
  sheetId='1LmJf7SquwoTrQVSmMOpfpvqxJYermuvDNJ3IksWjUfw', sheetName='botdata') {

  try {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    if (!sheet) {
      throw new Error("Sheet '" + sheetName + "' not found.");
    }
var url = "https://codeforces.com/api/contest.list";
  // Fetch the data using UrlFetchApp
  var response = UrlFetchApp.fetch(url);
  // Check for successful response
  if (response.getResponseCode() === 200) {
    
   
// Extract the data from the JSONP response(remove the callback function)
    var contestsThisweek= "";
    var content = response.getContentText();
    var data = JSON.parse( content);

    var z= "";
    var contests = data.result;
    for (var i=0;i<contests.length; i++){
if(contests[i].relativeTimeSeconds<=604800&&contests[i].relativeTimeSeconds>=0){
        contestsThisweek += contests[i].name;
        z= contests[i].name;
      }
      else if (contests.relativeTimeSeconds>=0){
        break;
      }
    }

  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  sheet.getRange(1, 20).setValue("contests in week"+ contestsThisweek);
  sheet.getRange(1, 21).setValue("most recent contest " + z);


}
    var lastRow = sheet.getLastRow();
    if (lastRow == 0) {
      Logger.log("Sheet '" + sheetName + "' is empty.");
      return;
    }
    var url = "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";
    
    var response = UrlFetchApp.fetch(url);

    if (response.getResponseCode() === 200) {
      var content = response.getContentText();
      var data = JSON.parse( content);
      var namamyeva= data.past_contests[0].contest_code.slice(-3);
    }

    var range = sheet.getRange("A2:W" + (lastRow + 1));
    var data = range.getValues();
    
       
    var codeforcescontestoftheweek =sheet.getRange(1, 20).getValue();
    var codeforcesrecentcontest =sheet.getRange(1, 21).getValue();
    // Loop through each row and update ratings
    for (var i = 0; i < data.length; i++) {

      var codeChefHandle = data[i][9];

      
      // Update CodeChef rating
      if (codeChefHandle!=="#N/A" &&  codeChefHandle!==""){var codeChefInfo = getCodeChefInfoall(codeChefHandle);
      if (codeChefInfo  !== null) {

        sheet.getRange(i + 2, 11).setValue(codeChefInfo.noOfContests);
        sheet.getRange(i + 2, 12).setValue(codeChefInfo.contestName.includes(namamyeva));
        sheet.getRange(i + 2, 13).setValue(codeChefInfo.contestName);
        sheet.getRange(i + 2, 14).setValue(codeChefInfo.latestrank );
        sheet.getRange(i + 2, 15).setValue(codeChefInfo.prevrating);
        sheet.getRange(i + 2, 16).setValue(codeChefInfo.latestrating);
        sheet.getRange(i + 2, 17).setValue(codeChefInfo.ratingchange);
      }
}
      // Update LeetCode rating
      
      var leetcodeHandle = data[i][1];
      if (leetcodeHandle!=="#N/A" &&  leetcodeHandle!==""){

        var leetcodeInfo = getleetcodeInfoall(leetcodeHandle);
      if (leetcodeInfo  !== null ) {
        sheet.getRange(i + 2, 3).setValue(leetcodeInfo.noOfContests);
        sheet.getRange(i + 2, 4).setValue(leetcodeInfo.latestcontestoflc);
        sheet.getRange(i + 2, 5).setValue(leetcodeInfo.contestName);
        sheet.getRange(i + 2, 6).setValue(leetcodeInfo.latestrank );
        sheet.getRange(i + 2, 7).setValue(leetcodeInfo.prevrating);
        sheet.getRange(i + 2, 8).setValue(leetcodeInfo.latestrating);        
        sheet.getRange(i + 2, 9).setValue(leetcodeInfo.ratingchange);
      }}

      var codeforcesHandle = data[i][17];

      

      // Update Codeforces rating
      if (codeforcesHandle!=="#N/A" &&  codeforcesHandle!==""){var codeforcesInfo = getCodeforcesInfoall(codeforcesHandle);

      if (codeforcesInfo !== null) {
        sheet.getRange(i + 2, 19).setValue(codeforcesInfo.noofcontests);
        sheet.getRange(i + 2, 20).setValue(codeforcescontestoftheweek.includes(codeforcesInfo.contestName));
        sheet.getRange(i + 2, 21).setValue(codeforcesrecentcontest.includes(codeforcesInfo.contestName));
        sheet.getRange(i + 2, 22).setValue(codeforcesInfo.contestName);
        sheet.getRange(i + 2, 23).setValue(codeforcesInfo.latestranking );
        sheet.getRange(i + 2, 24).setValue(codeforcesInfo.oldRating);
        sheet.getRange(i + 2, 25).setValue(codeforcesInfo.newRating);
        sheet.getRange(i + 2, 26).setValue(codeforcesInfo.newRating - codeforcesInfo.oldRating);
        
      }}

     
      // Sleep for 1 second to avoid rate limiting

      Utilities.sleep(1000);
      
    }
    
  } catch (error) {
    Logger.log("Error updating ratings: " + error);
  }
}
// Function to fetch CodeChef user's rating
function getCodeChefInfoall(handle) {
try {
    if (!handle) throw new Error("CodeChef handle is blank");

    var url = "https://codechef-api.vercel.app/" + handle;
    var response = UrlFetchApp.fetch(url);


    if (response.getResponseCode() === 200) {
      var content = response.getContentText();
      
      var data = JSON.parse( content);
      var contestsData = data.ratingData;
      var contests=  Object.entries(contestsData);

      if(contests.length >0){
        
        var latest =  contests[contests.length -1][1];
        

        if (contests.length  < 2 ){
          var prev = { rating : '1000' }
        }
        else{

        var prev =  contests[contests.length - 2][1];

        }
 
        var info = {
          contestName : latest.name ,
          latestrating : Math.floor(latest.rating),
          prevrating : Math.floor(prev.rating),
          ratingchange : parseInt(latest.rating )- parseInt(prev.rating),
          latestrank : latest.rank,
          noOfContests :contests.length
        }
      }
      else{
         var info = {
          contestName : "Hasen't given one yet",
          latestrating : 0,
          prevrating : 0,
          ratingchange : 0,
          latestrank : "Hasen't given one yet",
          noOfContests : contests.length
        }
      }
      
      return info;
    } else {
      throw new Error("Failed to fetch data for CodeChef handle: " + handle);
    }
  } catch (error) {
    Logger.log("Error fetching CodeChef rating: " + error);
    var info = {
          contestName : "wrong name",
          latestrating : "wrong name",
          prevrating : "wrong name",
          ratingchange : "wrong name",
          latestrank : "wrong name",
          noOfContests : "wrong name"
        }
      
      
      return info;
  }
}


// Function to fetch Codeforces user's rating
function getCodeforcesInfoall(handle) {
 try {
    if (!handle) throw new Error("Codeforces handle is blank");
  // Build the URL with the handle
  var url = "https://codeforces.com/api/user.rating?handle=" + handle + "&jsonp=angular.callbacks._1";
  // Fetch the data using UrlFetchApp
  var response = UrlFetchApp.fetch(url);
  // Check for successful response
  if (response.getResponseCode() === 200) {
    // Extract the data from the JSONP response (remove the callback function)
var content = response.getContentText().replace('angular.callbacks._1({"status":"OK",', '{');
 content = content.replace(");", '');
 if ( !( content.includes("status"))){
  var data = JSON.parse(content);
  // Check if there are any ratings
  if (data.result.length > 0) {
      var rating = data.result[data.result.length - 1];
      var ratings = {
        contestName: rating.contestName,
        oldRating: rating.oldRating,
        newRating: rating.newRating,
        latestranking : rating.rank,
        noofcontests : data.result.length
  };
    }
    else{
      var ratings = {
        contestName: "Hasn't given any yet",
        oldRating: "Hasn't given any yet",
        newRating: 0,
        latestranking : 0,
        noofcontests : 0
  };
    } 
    return ratings;
    }  }  }
  catch (error) {
    Logger.log("Error fetching Codeforces rating: " + error);
    var ratings = {
        contestName: "wrong name",
        oldRating: "wrong name",
        newRating: "wrong name",
        latestranking : "wrong name",
        noofcontests : "wrong name"
  };
    return ratings;
  }
}

// Function to fetch LeetCode user's rating using GraphQL
function getleetcodeInfoall(handle) {
   try {

    var apiUrl = 'https://leetcode.com/graphql';
var query = `
query {   userContestRanking(username: "${handle}"){
        attendedContestsCount
        rating
      }
      userContestRankingHistory(username: "${handle}" ){
        attended
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
