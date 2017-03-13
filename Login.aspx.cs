using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using System.Data.Entity;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["temp"] != null)
        {
            var id = Convert.ToString(Request["temp"]);
            TempLogin(id);
        }
    }

    private void TempLogin(string id)
    {
        using (var db = new MSEsystemEntities())
        {
            var user = db.User.Where(i => i.uid == inputUser.Text && i.UserPassword == inputPassword.Text).FirstOrDefault();
            if (user == null || user.LoginStatus==true)
            {
                pnlMessage.Visible = true;
            }
            else
            {
                Session["user"] = user.DisplayName;
                Session["uid"] = user.uid;
                Session["level"] = user.Role; // 1 - regular, 2 - employee
                Session["admin"] = user.admin; // 1 - admin, 0 - no admin
                Response.Redirect("Default.aspx");
            }
        }
    }

    protected void Login_Click(object sender, EventArgs e)
    {
        using (var db = new MSEsystemEntities())
        {
          
            User user = db.User.Where(i => i.uid == inputUser.Text && i.UserPassword == inputPassword.Text).FirstOrDefault();
            if (user == null || user.LoginStatus == true)
            {
                pnlMessage.Visible = true;
            }
            else
            {
                Session["user"] = user.DisplayName;
                Session["uid"] = user.uid;
                Session["level"] = user.Role; // 1 - regular, 2 - employee
                Session["admin"] = user.admin; // 1 - admin, 0 - no admin
                Response.Redirect("Default.aspx");
            }
        }
    }
    protected void Reset_Click(object sender, EventArgs e)
    {
        pnlMessage.Visible = false;
        inputUser.Text = "";
        inputPassword.Text = "";
    }

    // temp login

}