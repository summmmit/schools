@extends('admin.layout.adminLayout')

@section('stylesheets')

<link rel="stylesheet" type="text/css" href="{{ URL::asset('assets/plugins/select2/select2.css'); }}" />
@stop

@section('page_header')
<h1><i class="fa fa-pencil-square"></i> Time Table <small>Timining chart for teachers and classes.</small></h1>
@stop

@section('page_breadcrumb')
<ol class="breadcrumb">
    <li>
        <a href="#">
            Dashboard
        </a>
    </li>
    <li class="active">
        Time Table
    </li>
</ol>
@stop
@section('content')
<!-- start: PAGE CONTENT -->
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-white">
            <div class="panel-heading">
                <h4 class="panel-title">Session: <span class="text-bold">2015 - 2016</span></h4>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3">
                        <a class="btn btn-green show-sv" href="#subview-add-classes" data-startFrom="right">
                            Show Right Subview <i class="fa fa-chevron-right"></i>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-orange add-row">
                            Add New Stream <i class="fa fa-plus"></i>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-orange add-row">
                            Add New Section<i class="fa fa-plus"></i>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-orange add-row">
                            Add New Subject<i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <!-- start: EXPORT DATA TABLE PANEL  -->
        <div class="panel panel-white">
            <div class="panel-heading">
                <h4 class="panel-title">Export <span class="text-bold">Data</span> Table</h4>
            </div>
            <div class="panel-body">
            </div>
        </div>
        <!-- end: EXPORT DATA TABLE PANEL -->
    </div>
</div>
<!-- end: PAGE CONTENT-->
@stop

@section('subview')
<div id="subview-add-classes" class="no-display">
    <div class="col-md-8 col-md-offset-2">
        <h3>Classes Present Now</h3>
        <div class="row">
            <div class="col-md-12 space20">
                <button class="btn btn-orange add-row">
                    Add New <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-hover" id="classes_table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody
                    @foreach($classes as $class => $value)
                    <tr>
                        <td>{{ $classes[$class]->class }}</td>
                        <td>
                            <a href="#" class="edit-row">
                                Edit
                            </a></td>
                        <td>
                            <a href="#" class="delete-row">
                                Delete
                            </a></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop

@section('scripts')
<!-- Scripts for This page only -->
<script type="text/javascript" src="{{ URL::asset('assets/plugins/select2/select2.min.js'); }}"></script>
<script src="{{ URL::asset('assets/js/modifiedJs/admin/timetable/table-data.js'); }}"></script>
<script src="{{ URL::asset('assets/js/ui-subview.js'); }}"></script>             <!-- For Subview -->
<script>
jQuery(document).ready(function() {
    Main.init();
    SVExamples.init();
    UISubview.init();
    TableData.init();
});
</script>
@stop