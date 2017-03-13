<%@ WebHandler Language="C#" Class="FileUploadHandler" %>

using System;
using System.Web;
using System.IO;

public class FileUploadHandler : IHttpHandler {
    private string unixTS;

    public void ProcessRequest (HttpContext context) {
        //context.Request["key"]
        if (context.Request.Files.Count > 0)
        {
            try
            {
                var id = HttpContext.Current.Request["id"];
                HttpFileCollection files = context.Request.Files;
                HttpPostedFile file = files[0];
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                string fname = HttpContext.Current.Server.MapPath("~/docs/") + id.ToString() + fileExtension;
                file.SaveAs(fname);
                //PdfConverter.ConvertOfficeToPdf(fname);

                context.Response.ContentType = "text/plain";
                var s = "ok"; 
                context.Response.Write(s);
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.Message);
            }
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }    
}