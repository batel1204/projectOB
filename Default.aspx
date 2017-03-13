<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script>
        var scope;
        $(function () {
            scope = angular.element($("body")).scope();
            scope.UserId="<%=Session["uid"]%>";
            scope.UserLevel = "<%=Session["level"]%>";
            scope.isAdmin = "<%=Session["admin"]%>";
            // ping - to track session
            setTimeout(function () {
                $.get("Tasks.aspx?tp=ping");
            },
                60000);
        });
    </script>
    <style>
        .page-header {
            border-bottom: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container">
        <div style="font-size: 11px;">
            <div style="float: right">מכללת אורט בראודה כרמיאל</div>
            <div style="float: left">
                שלום 
            <b><%=Session["user"] %></b>!
            <a href="Default.aspx?exit=1" style="margin-right: 4px">יציאה</a>
            </div>
            <div style="clear: both"></div>
        </div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="images/maintenance.png" class="brand" /></a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li data-ng-repeat="p in pages track by $index" data-ng-if="($index<3)" data-ng-class="(selectedPage==p.Id) && 'active'">
                            <a href="#" data-ng-click="setPage(p.Id)" data-ng-bind="p.Item"></a>
                        </li>
                       
                        <%--for admin--%>
                       <%-- <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">כלי ניהול <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li data-ng-repeat="p in pages track by $index" data-ng-if="$index>1">
                                    <a href="#" data-ng-click="setPage(p.Id)" data-ng-bind="p.Item"></a>
                                </li>
                            </ul>
                        </li>--%>
                    </ul>
                    <form class="navbar-form navbar-left" role="search" style="margin-left: 0px; padding-left: 0px">
                        <div class="form-group" style="position: relative; top: 3px;">
                            <input type="text" class="form-control" style="border: none" placeholder="חפש" data-ng-model="search.Key" /><a href="#"
                                data-ng-click="search.Key=''" data-ng-show="search.Key.trim()!=''"
                                style="position: absolute; top: 6px; left: 8px; color: #cccccc;"><span class="glyphicon glyphicon-remove"></span></a>
                        </div>
                    </form>
                </div>
            </div>
        </nav>

        <div class="page-header">
            <table style="width: 100%" id="tbBuild">
                <tr>
                    <td style="text-align: right;">
                        <div>
                            <div style="float: right">
                                <h1 id="navbar" style="margin-right: 110px;">
                                    <span data-ng-bind="dicPages[selectedPage].Name"></span>
                                </h1>
                            </div>
                            <div class="alert alert-dismissible alert-success pull-right"
                                data-ng-show="(!msg.IsError && msg.Text!='')"
                                data-ng-bind="msg.Text" style="float: right; position: relative; top: 6px; right: 20px;">
                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </td>
                    <td style="text-align: left; padding-top: 15px;">
                        <!--paging-->
                        <span data-ng-show="isPagerShown()">
                                            <span class="hidden-xs" style="margin-left: 20px; position: relative; top: 2px; display: inline-block"><span
                                                data-ng-bind="gridPager.Skip+1"></span>&nbsp;-&nbsp;<span data-ng-bind="getToRecord()"></span>&nbsp;&nbsp;מתוך&nbsp;&nbsp;<span
                                                    data-ng-bind="totalRecs()"></span></span>
                                            <a href="#" class="btn btn-primary btn-xs nav-but"
                                                data-ng-class="{'linkDisabled': gridPager.Skip==0}"
                                                data-ng-click="firstPage()" style="margin-left: 1px">
                                                <span class="glyphicon glyphicon-step-forward" title="הראשון"></span>
                                            </a>

                                            <a href="#" class="btn btn-primary btn-xs nav-but"
                                                data-ng-class="{'linkDisabled': gridPager.Skip==0}"
                                                data-ng-click="prevPage()" style="margin-left: 1px">
                                                <span class="glyphicon glyphicon-forward" title="הקודם"></span>
                                            </a>

                                            <a href="#" class="btn btn-primary btn-xs nav-but" title="הבאה" style="margin-left: 1px"
                                                data-ng-click="nextPage()"
                                                data-ng-class="{'linkDisabled': !isPagingAtTheEnd()}">
                                                <span class="glyphicon glyphicon-backward"></span></a>


                                            <a href="#" class="btn btn-primary btn-xs nav-but" title="האחרון" data-ng-click="lastPage()" style="margin-left: 1px"
                                                data-ng-class="{'linkDisabled': !isPagingAtTheEnd()}">
                                                <span class="glyphicon glyphicon-step-backward"></span>
                                            </a>
                                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="table-responsive">
            <!-- tickets-->
            <div data-ng-include="'inc/tb.Ticket.htm'"></div>
            <div data-ng-include="'modals/Ticket.htm'" onload="initTicket()"></div>

             <!-- tickets-->
            <div data-ng-include="'modals/OpenTicket.htm'" onload="OpenFormTicket()"></div>
    

            <!-- errors -->
            <div data-ng-include="'modals/fileExtError.htm'"></div>



</asp:Content>

