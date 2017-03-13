<%@ WebHandler Language="C#" Class="imgUploader" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

public class imgUploader : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        try
        {
            var id = HttpContext.Current.Request["id"];
            var tp = HttpContext.Current.Request["tp"];
            //string dirFullPath = HttpContext.Current.Server.MapPath("~/images/" + tp + "/");
            //string[] files = System.IO.Directory.GetFiles(dirFullPath);
            //files = System.IO.Directory.GetFiles(dirFullPath);
            //string str_image = "";

            HttpPostedFile file = context.Request.Files[0];
            string fileName = file.FileName;
            var fileExtension = Path.GetExtension(fileName).ToLower();
            var ext = new string[] {".gif", ".jpg", ".jpeg", ".png", ".bmp"};

            //if (fileExtension == ".gif" || fileExtension == ".jpg" || fileExtension == ".png" || fileExtension == ".bmp" || fileExtension=="pdf")
            if(ext.Contains(fileExtension))
            {

                var str_image = id.ToString() + ".png"; // fileExtension;
                if (!string.IsNullOrEmpty(fileName))
                {

                    //str_image = id.ToString() + "_" + rand + fileExtension;
                    //str_image = id.ToString() + "_" + rand + ".jpg"; // fileExtension;
                    
                    string pathToSave_100 = HttpContext.Current.Server.MapPath("~/images/" + tp + "/") + str_image;

                    var ih = new ImageHandler();
                    var bmpPostedImage = new System.Drawing.Bitmap(file.InputStream);
                    ih.Save(bmpPostedImage, 90, 90, 100, pathToSave_100);
                }

                context.Response.Write(str_image);
            }
            else
            {
                context.Response.Write("__error_format");
            }
        }
        catch (Exception ac)
        {
            context.Response.Write("__error_unknown");
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}