// Function to update ratings for all users in the spreadsheet
function updatecodechefRatings(
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
    
 
 
    var url = "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";
    
    var response = UrlFetchApp.fetch(url);

    if (response.getResponseCode() === 200) {
      var content = response.getContentText();
      var data = JSON.parse( content);
      var namamyeva= data.past_contests[0].contest_code.slice(-3);
      
    }

    var range = sheet.getRange("A2:W" + (lastRow + 1));
    var data = range.getValues();

    Logger.log(namamyeva)
    // Loop through each row and update ratings
    for (var i = 0; i < data.length; i++) {

      var codeChefHandle = data[i][9];



      // Update CodeChef rating
      var codeChefInfo = getCodeChefInfo(codeChefHandle);
      if (codeChefInfo  !== null) {
        sheet.getRange(i + 2, 11).setValue(codeChefInfo.noOfContests);
        Logger.log(codeChefInfo.noOfContests)
        if (codeChefInfo.noOfContests =="wrong name"){
          sheet.getRange(i + 2, 12).setValue("wrong name");
        
        }
        else{
          sheet.getRange(i + 2, 12).setValue(codeChefInfo.contestName.includes(namamyeva));
        }
        sheet.getRange(i + 2, 13).setValue(codeChefInfo.contestName);
        sheet.getRange(i + 2, 14).setValue(codeChefInfo.latestrank );
        sheet.getRange(i + 2, 15).setValue(codeChefInfo.prevrating);
        sheet.getRange(i + 2, 16).setValue(codeChefInfo.latestrating);
        sheet.getRange(i + 2, 17).setValue(codeChefInfo.ratingchange);
      }

      // Update Codeforces rating
  


      // Sleep for 1 second to avoid rate limiting
      Utilities.sleep(1000);
    }

  } catch (error) {
    Logger.log("Error updating ratings: " + error);
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
