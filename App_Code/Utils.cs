using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;

/// <summary>
/// Summary description for Utils
/// </summary>

public class Utils
{
    public static SqlConnection conn;

    public static DataSet dset = new DataSet();
    public static bool IsTestMode;
   


    public static string GetInitData()
    {
        DataSet data = new DataSet();
        var connectStr = WebConfigurationManager.AppSettings["SQLServer"];
       
        conn = new SqlConnection(connectStr);
        SqlCommand sqlComm = new SqlCommand("spGetData", conn);
        sqlComm.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter();
        da.SelectCommand = sqlComm;
        da.Fill(data);

        data.Tables[0].TableName = "User";
        data.Tables[1].TableName = "Employee";
        data.Tables[2].TableName = "Ticket";
        data.Tables[3].TableName = "TicketsForEmployee";
        data.Tables[4].TableName = "Category";
        data.Tables[5].TableName = "Location";
        data.Tables[6].TableName = "TicketsToDo";
        data.Tables[7].TableName = "MyTickets";

        return JsonConvert.SerializeObject(data, new CustomDateTimeConverter());
            
    
    }

    /* public static string SaveCourse(dynamic obj)
     {
         try
         {
             using (var db = new MSEEntities())
             {
                 int id = Convert.ToInt32(obj["Id"]);
                 var b = id == 0 ? new tbCourse() : db.tbCourses.FirstOrDefault(i => i.Id == id);
                 b.Name = obj["Name"] == null ? "" : Convert.ToString(obj["Name"]);
                 b.Branch = Convert.ToInt32(obj["Branch"]);
                 b.Instructor = Convert.ToInt32(obj["Instructor"]);
                 b.CourseType = Convert.ToInt32(obj["CourseType"]);
                 b.StartDate = DateTime.ParseExact(Convert.ToString(obj["StartDate"]), "dd-MM-yyyy", CultureInfo.InvariantCulture);
                 b.EndDate = DateTime.ParseExact(Convert.ToString(obj["EndDate"]), "dd-MM-yyyy", CultureInfo.InvariantCulture);
                 b.Comments = obj["Comments"]==null ? "" : Convert.ToString(obj["Comments"]);
                 b.IsTrom = obj["IsTrom"] == null ? false : Convert.ToBoolean(obj["IsTrom"]);
                 if (id == 0)
                 {
                     db.tbCourses.Add(b);
                     db.SaveChanges();
                 }
                 db.SaveChanges();
                 // lessons

                 var toDelete = db.tbLessons.Where(i => i.Branch == b.Branch && i.Course == b.Id && i.Instructor == b.Instructor).ToList();
                 db.tbLessons.RemoveRange(toDelete);
                 db.SaveChanges();
                 var ar = (JArray)obj["Lessons"];
                 foreach (var item in ar)
                 {
                     var l = new tbLesson();
                     l.Branch = b.Branch;
                     l.Course = b.Id;
                     l.Instructor = b.Instructor;
                     l.Day = Convert.ToInt32(item["Day"]);
                     l.Hour = Convert.ToInt32(item["Time"]);
                     db.tbLessons.Add(l);
                 }
                 db.SaveChanges();
                 return JsonConvert.SerializeObject(b, new CustomDateTimeConverter());
             }
         }
         catch (Exception ex)
         {
             return "error";
         }
     }
 }*/

    /*  public partial class tbInstructorExt : tbInstructor
     {
      public string Img { get; set; }
      public tbInstructorExt(tbInstructor o)
      {
          uid = o.uid;
          FName = o.FName;
          LName = o.LName;
          Phone = o.Phone;
          Comments = o.Comments;
          Color = o.Color;
          Doc = o.Doc;
          Sn = o.Sn;       
      }
  }*/

    class CustomDateTimeConverter : IsoDateTimeConverter
    {
        public CustomDateTimeConverter()
        {
            base.DateTimeFormat = "dd-MM-yyyy";
        }
    }
}