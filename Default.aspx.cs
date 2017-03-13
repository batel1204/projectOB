using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // temp
        //Session["user"] = "בתאל סבח";

        // working version
        if (Session["user"] == null)
            Response.Redirect("Login.aspx");

        if (Request["exit"] != null)
        {
            Session.Clear();
            Response.Redirect("Login.aspx");
        }

    }
}