<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .form-horizontal .form-group {
            /*margin-left: 0px;*/
            margin-top: 10px;
        }

        .er-div {
            padding-right: 0px;
            font-size: 11px;
        }

            .er-div span {
                position: relative;
                top: 7px;
            }

        .panel-body {
            padding: 30px 15px 30px 15px;
        }

        .panel-inverse > .panel-heading {
            background-color: #46aee9;
        }
        .panel-body{
            border:1px solid #46aee9!important;
        }
        .form-control {
            height: 39px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <form runat="server" class="form-horizontal" id="theForm">
        <div class="panel panel-inverse" style="width: 500px; margin: 100px auto 0px;">
            <div class="panel-heading">
                <h2 class="panel-title" style="color: white">מערכת לניהול פניות - מחלקת לוגיסטיקה אורט בראודה</h2>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="inputUser" class="col-md-3 control-label">שם משתמש</label>
                    <div class="col-md-5">
                        <asp:TextBox runat="server" TextMode="SingleLine" CssClass="form-control" ID="inputUser" placeholder="שם משתמש" />
                    </div>
                    <div class="col-md-4 er-div">
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server"
                            ControlToValidate="inputUser" ForeColor="Red"
                            ErrorMessage="שם משתמש הינו שדה חובה"></asp:RequiredFieldValidator>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputPassword" class="col-md-3 control-label">סיסמא</label>
                    <div class="col-md-5">
                        <asp:TextBox runat="server" TextMode="Password" CssClass="form-control" ID="inputPassword" placeholder="סיסמא" />
                    </div>
                    <div class="col-md-4 er-div">
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server"
                            ControlToValidate="inputPassword" ForeColor="Red"
                            ErrorMessage="סיסמא האינו שדה חובה"></asp:RequiredFieldValidator>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail" class="col-md-3 control-label">&nbsp;</label>
                    <div class="col-md-9">
                        <asp:Button runat="server" CssClass="btn btn-info" Text="כניסה" OnClick="Login_Click" />
                        <asp:Button runat="server" CausesValidation="False" Text="איתחול" CssClass="btn btn-default" OnClick="Reset_Click" />
                    </div>
                </div>
            </div>
        </div>

        <div style="width: 500px; margin: 10px auto; text-align: center; padding: 8px 0px">
            <asp:Panel runat="server" CssClass="alert alert-danger" ID="pnlMessage" Visible="false">
                זיהוי משתמש נכשל, נסה שנית..
            </asp:Panel>
        </div>

        <div style="width: 500px; margin: 0px auto; padding: 0px">            
            <div class="form-group">
               <%-- <label class="col-md-3 control-label">קישורים זמניים</label>--%>
                <div class="col-md-offset-35">                    
                    <div class="pull-right"><a href="Login.aspx?temp=1">admin</a></div>
                    <%--<div class="pull-left">מנהל</div>--%>
                </div>
            </div>
        </div>


    </form>
</asp:Content>

