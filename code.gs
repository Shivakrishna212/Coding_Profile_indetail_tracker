// Function to update ratings for all users in the spreadsheet
function updateRatings(sheetId='1LmJf7SquwoTrQVSmMOpfpvqxJYermuvDNJ3IksWjUfw', sheetName='botdata') {

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
      var codeChefHandle = data[i][8];
      var codeforcesHandle = data[i][15];

      

      // Update LeetCode rating
      
      var leetcodeHandle = data[i][1];


      var leetcodeInfo = getleetcodeInfo(leetcodeHandle);

      if (leetcodeInfo  !== null) {
        sheet.getRange(i + 2, 3).setValue(leetcodeInfo.noOfContests);
        sheet.getRange(i + 2, 4).setValue(leetcodeInfo.contestName);
        sheet.getRange(i + 2, 5).setValue(leetcodeInfo.latestrank );
        sheet.getRange(i + 2, 6).setValue(leetcodeInfo.prevrating);
        sheet.getRange(i + 2, 7).setValue(leetcodeInfo.latestrating);        
        sheet.getRange(i + 2, 8).setValue(leetcodeInfo.ratingchange);
      }


      // Update CodeChef rating
      var codeChefInfo = getCodeChefInfo(codeChefHandle);
      if (codeChefInfo  !== null) {
        sheet.getRange(i + 2, 10).setValue(codeChefInfo.noOfContests);
        sheet.getRange(i + 2, 11).setValue(codeChefInfo.contestName);
        sheet.getRange(i + 2, 12).setValue(codeChefInfo.latestrank );
        sheet.getRange(i + 2, 13).setValue(codeChefInfo.prevrating);
        sheet.getRange(i + 2, 14).setValue(codeChefInfo.latestrating);
        sheet.getRange(i + 2, 15).setValue(codeChefInfo.ratingchange);
      }

      // Update Codeforces rating
      var codeforcesInfo = getCodeforcesInfo(codeforcesHandle);

      if (codeforcesInfo !== null) {
        sheet.getRange(i + 2, 17).setValue(codeforcesInfo.noofcontests);
        sheet.getRange(i + 2, 18).setValue(codeforcesInfo.contestName);
        sheet.getRange(i + 2, 19).setValue(codeforcesInfo.latestranking );
        sheet.getRange(i + 2, 20).setValue(codeforcesInfo.oldRating);
        sheet.getRange(i + 2, 21).setValue(codeforcesInfo.newRating);
        sheet.getRange(i + 2, 22).setValue(codeforcesInfo.newRating - codeforcesInfo.oldRating);
        
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
    if (!handle) throw new Error("leetcode handle is blank");

    var url = "https://alfa-leetcode-api.onrender.com/" + handle+"/contest";
    var response = UrlFetchApp.fetch(url);

    if (response.getResponseCode() === 200) {
      var content = response.getContentText();
      var data = JSON.parse( content);
      var contestsData = data.contestParticipation;
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
          contestName : latest.contest.title ,
          latestrating : Math.floor(latest.rating),
          prevrating : Math.floor(prev.rating),
          ratingchange : parseInt(latest.rating )- parseInt(prev.rating),
          latestrank : latest.ranking,
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
      throw new Error("Failed to fetch data for leetcode handle: " + handle);
    }
  } catch (error) {
    Logger.log("Error fetching leetcode rating: " + error);
    return null;
  }
}

// Function to fetch CodeChef user's rating
function getCodeChefInfo(handle) {
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
    return null;
  }
}


// Function to fetch Codeforces user's rating
function getCodeforcesInfo(handle) {
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
        noofcontests : data.result.length
  };

    }
 
    return ratings;
    }
    
    }
   



  }
  catch (error) {
    Logger.log("Error fetching Codeforces rating: " + error);
    return null;
  }
}
