async function connectToMongDB() {
  /*
    Necessary api connections parameters to establish connections to mongo db realm/webhook/http endpoint
  */
  let AUMMS_API =
    "https://ap-south-1.aws.data.mongodb-api.com/app/gsheetstomongodb-gylry/endpoint/AUMMS_API";
  let AUMMS_API_KEY =
    "YUgdRi2PnxSl6wiLJXSIHsIgk7xcux9BhPPFxusqNlqUDsejdiwbTxMr0nfRIIfr";

  /*
    True Name of the google sheet (currently only 'Form Responses 1' i.e 'aumms' google sheet is active )
  */
  Logger.log(SpreadsheetApp.getActiveSheet().getName());
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "Form Responses 1"
  );

  /*
    Assigning column name's index for easier access to cells in every row
  */
  const rows = sheet.getDataRange().getValues();
  const FirstNameIdx = rows[0].indexOf("First Name");
  const LastNameIdx = rows[0].indexOf("Last Name");
  const EmailIdx = rows[0].indexOf("Email");
  const GraduationYearIdx = rows[0].indexOf("Year of Graduation");
  const DegreeIdx = rows[0].indexOf("Degree");
  const DepartmentIdx = rows[0].indexOf("Department");
  const CampusIdx = rows[0].indexOf("Campus");
  const Knowledge1Idx = rows[0].indexOf("Knowledge 1");
  const Knowledge2Idx = rows[0].indexOf("Knowledge 2");
  const Knowledge3Idx = rows[0].indexOf("Knowledge 3");
  const Knowledge4Idx = rows[0].indexOf("Knowledge 4");
  const StatusIdx = rows[0].indexOf("Status");

  /*
    
    Creating form data and parameters required for the http request
    Storing the records with response message as 'success' or 'already' for deletion
    Preserving records that failed to be inserted into mongo db and combining them with the next batch of records
    Next batch of records will be processed on the next day, processed by triggers on a 24 hour basis.

  */

  let rowsToBeDeleted = [];
  for (let i = 1; i < rows.length; i++) {
    let formData = {
      FirstName: rows[i][FirstNameIdx].toString().toLowerCase(),
      LastName: rows[i][LastNameIdx].toString().toLowerCase(),
      Email: rows[i][EmailIdx],
      GraduationYear: rows[i][GraduationYearIdx],
      Degree: rows[i][DegreeIdx].toString().toLowerCase(),
      Department: rows[i][DepartmentIdx].toString().toLowerCase(),
      Campus: rows[i][CampusIdx].toString().toLowerCase(),
      Knowledge1: rows[i][Knowledge1Idx].toString().toLowerCase(),
      Knowledge2: rows[i][Knowledge2Idx].toString().toLowerCase(),
    };
    /*
        Not adding Knowledge 3 and 4 if left blank
      */

    if (rows[i][Knowledge3Idx].toString().toLowerCase() != "")
      formData["Knowlede3"] = rows[i][Knowledge3Idx].toString().toLowerCase();
    if (rows[i][Knowledge4Idx].toString().toLowerCase() != "")
      formData["Knowlede4"] = rows[i][Knowledge4Idx].toString().toLowerCase();

    formData = JSON.stringify(formData);
    let params = {
      method: "post",
      headers: {
        "api-key": AUMMS_API_KEY,
      },
      payload: formData,
    };

    let resp = "";
    try {
      resp = await UrlFetchApp.fetch(AUMMS_API, params).toString();
    } catch (err) {
      console.log(err);
    }

    if (resp.toString() != "Failure") {
      console.log(formData);
      rowsToBeDeleted.push(i + 1);
      console.log("deleted!");
    } else {
      sheet.getRange(i + 1, StatusIdx).setValue(resp);
      console.log(formData);
      console.log("preserved!");
    }
  }

  /*
    When a row is deleted from a sheet, the rows below it get renumbered even as the script continues to run. 
    If the scriptsubsequently tries to also delete those rows, the result is unpredictable. For this reason, 
    when deleting rows one should proceed from bottom to top.
  
    Deletion process given below

  */

  for (let i = rowsToBeDeleted.length - 1; i >= 0; i--) {
    await sheet.deleteRow(rowsToBeDeleted[i]);
  }
}
