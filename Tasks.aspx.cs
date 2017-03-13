using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;
using System.Configuration;

public partial class Tasks : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        Utils.IsTestMode = bool.Parse(System.Web.Configuration.WebConfigurationManager.AppSettings["TestMode"]);

        if (Request["tp"] == null) Response.End();
        var tp = Request["tp"] as string;
        var postData = new System.IO.StreamReader(Request.InputStream).ReadToEnd();
        dynamic obj = postData == "" ? null : JObject.Parse(postData);
        //int id;
        switch (tp)
        {
            case "ping":
                Response.Write("ok");
                break;
            case "temp": // for temp tasks
                //Utils.TempForDB();               
                break;
            case "getInitData":
                Response.Write(Utils.GetInitData());
                break;
            //case "saveCourse":
            //    Response.Write(Utils.SaveCourse(obj));
            //    break;
            //case "saveBranch":
            //    Response.Write(Utils.SaveBranch(obj));
            //    break;
            //case "saveInstructor":
            //    Response.Write(Utils.SaveInstructor(obj));
            //    break;
            default:
                Response.Write(Utils.GetInitData());
                break;
        }
    }
}
