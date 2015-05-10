var TableDataTimeTable = function() {
    "use strict";
    var runDataTable_TimeTable = function() {
        var newRow = false;
        var actualEditingRow = null;

        function restoreRow(oTimeTable, nRow) {
            var aData = oTimeTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTimeTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTimeTable.fnDraw();
        }

        function editRow(oTimeTable, nRow, rowData) {
            var aData = oTimeTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '#';
            var sTime, eTime;
            if (aData[1]) {
                var time = aData[1].split('-');
                sTime = time[0];
                eTime = time[1];
            } else {
                sTime = "";
                eTime = "";
            }
            var startTime = '<div class="col-md-4" style="padding: 0"><div class="input-group input-append bootstrap-timepicker"><input type="text" class="form-control time-picker" id="new-input-start-time" value="' + sTime + '">'+
                    '<span class="input-group-addon add-on"><i class="fa fa-clock-o"></i></span></div></div>';
            var endTime = '<div class="col-md-offset-2 col-md-4" style="padding: 0"><div class="input-group input-append bootstrap-timepicker"><input type="text" class="form-control time-picker" id="new-input-end-time" value="' + eTime + '">'+
                '<span class="input-group-addon add-on"><i class="fa fa-clock-o"></i></span></div></div>';
            jqTds[1].innerHTML = startTime + endTime;
            jqTds[2].innerHTML = '<select id="form-field-select-subject" class="form-control search-select"><option value="">Select Subject....</option> </select>';
            jqTds[3].innerHTML = '<select id="form-field-select-teacher" class="form-control search-select"><option value="">Select Teacher....</option> </select>';
            jqTds[4].innerHTML = '';
            jqTds[5].innerHTML = '<a class="save-row-time-table" href="#">Save</a>';
            jqTds[6].innerHTML = '<a class="cancel-row-time-table" href="#">Cancel</a>';

            var data = {
                class_id: rowData.class_id,
                section_id: rowData.section_id
            };
            $.ajax({
                url: 'http://localhost/projects/schools/public/admin/time/table/get/subjects',
                dataType: 'json',
                method: 'POST',
                data: data,
                success: function(data, response) {
                    var selectSubject = oTimeTable.find('#form-field-select-subject');
                    var selectSubjectRowId = oTimeTable.find('#form-field-select-subject').parent().attr('id');
                    var i;
                    var subjects = data.result.subjects;
                    for (i = 0; i < subjects.length; i++) {
                        if (subjects[i].id == rowData.subject_id) {
                            selectSubject.append('<option value="' + subjects[i].id + '" selected>' + subjects[i].subject_name + ' ( ' + subjects[i].subject_code + ')' + '</option>');
                        } else {
                            selectSubject.append('<option value="' + subjects[i].id + '">' + subjects[i].subject_name + ' ( ' + subjects[i].subject_code + ')' + '</option>');
                        }
                    }
                }
            });
            $('.time-picker').timepicker({
                showMeridian: false
            });

            $.ajax({
                url: 'http://localhost/projects/schools/public/admin/time/table/get/teachers',
                dataType: 'json',
                method: 'POST',
                success: function(data, response) {
                    var selectTeacher = oTimeTable.find('#form-field-select-teacher');
                    var i;
                    var teachers = data.result.teachers;
                    for (i = 0; i < teachers.length; i++) {
                        var name = teachers[i].first_name + ' ' + teachers[i].middle_name + ' ' + teachers[i].last_name;
                        // var picUrl = "http://localhost/projects/schools/public/assets/projects/images/" + data.teachers[i].pic;
                        //var pic = '<img class="thumbnail" src="'+ picUrl +'" height="50px" width="50px">';
                        if (teachers[i].id == rowData.teacher_id) {
                            selectTeacher.append('<option value="' + teachers[i].id + '" selected>' + name + '</option>');
                        } else {
                            selectTeacher.append('<option value="' + teachers[i].id + '">' + name + '</option>');
                        }
                    }
                }
            });

        }

        function saveRow(oTimeTable, nRow, result) {
            var jqInputs = $('input', nRow);
            nRow.setAttribute('id', result.period.id);
            nRow.setAttribute('data-subject-id', result.subject.id);
            nRow.setAttribute('data-section-id', result.period.section_id);
            nRow.setAttribute('data-teacher-id', result.teacher.id);
            oTimeTable.fnUpdate(oTimeTable.fnSettings().aoData.length, nRow, 0, false);
            var timings = timeFormat(result.period.start_time) + ' - ' + timeFormat(result.period.end_time);
            oTimeTable.fnUpdate(timings, nRow, 1, false);
            var subject = result.subject.subject_name + ' ( ' + result.subject.subject_code + ' )';
            oTimeTable.fnUpdate(subject, nRow, 2, false);
            var teacher = result.teacher.first_name + ' ' + result.teacher.middle_name + ' ' + result.teacher.last_name;
            oTimeTable.fnUpdate(teacher, nRow, 3, false);
            var picUrl = "http://localhost/projects/schools/public/assets/projects/images/" + result.teacher.pic;
            var pic = '<img class="thumbnail" src="' + picUrl + '" height="50px" width="50px">';
            oTimeTable.fnUpdate(pic, nRow, 4, false);
            oTimeTable.fnUpdate('<a class="edit-row-time-table" href="">Edit</a>', nRow, 5, false);
            oTimeTable.fnUpdate('<a class="delete-row-time-table" href="">Delete</a>', nRow, 6, false);
            oTimeTable.fnDraw();
            newRow = false;
            actualEditingRow = null;
        }

        $('body').on('click', '#add-row-time-table', function(e) {
            e.preventDefault();
            if (newRow === false) {
                if (actualEditingRow) {
                    restoreRow(oTimeTable, actualEditingRow);
                }
                newRow = true;
                var aiNew = oTimeTable.fnAddData(['', '', '', '', '', '', '']);
                var nRow = oTimeTable.fnGetNodes(aiNew[0]);

                var rowData = {
                    class_id: $(this).parentsUntil('.panel').find('#field-select-time-table-class').val(),
                    section_id: $(this).parentsUntil('.panel').find('#field-select-time-table-section').val()
                };

                editRow(oTimeTable, nRow, rowData);
                actualEditingRow = nRow;
            }
        });
        $('#table-add-class-time-table').on('click', '.cancel-row-time-table', function(e) {
            e.preventDefault();
            if (newRow) {
                newRow = false;
                actualEditingRow = null;
                var nRow = $(this).parents('tr')[0];
                oTimeTable.fnDeleteRow(nRow);

            } else {
                restoreRow(oTimeTable, actualEditingRow);
                actualEditingRow = null;
            }
            oTimeTable.parentsUntil(".panel").find(".errorHandler").addClass("no-display");
        });
        $('#table-add-class-time-table').on('click', '.delete-row-time-table', function(e) {
            e.preventDefault();
            if (newRow && actualEditingRow) {
                oTimeTable.fnDeleteRow(actualEditingRow);
                newRow = false;

            }

            var nRow = $(this).parents('tr')[0];
            var class_id = $(this).parentsUntil('.panel').find('#field-select-time-table-class').val();
            var section_id = $(this).parentsUntil('.panel').find('#field-select-time-table-section').val();
            var period_id = $(this).parents('tr').attr('id');
            var day_id = $(this).parents('tr').attr('data-day-id');
            var subject_id = $(this).parents('tr').attr('data-subject-id');
            var teacher_id = $(this).parents('tr').attr('data-teacher-id');

            var data = {
                period_id: period_id,
                class_id: class_id,
                day_id: day_id,
                section_id: section_id,
                subject_id: subject_id,
                teacher_id: teacher_id
            };

            bootbox.confirm("Are you sure to delete this row? If you Delete it, Classes , Subjects and Sections associated with it will also get delete.", function(result) {
                if (result) {
                    $.blockUI({
                        message: '<i class="fa fa-spinner fa-spin"></i> Do some ajax to sync with backend...'
                    });
                    $.ajax({
                        url: 'http://localhost/projects/schools/public/admin/time/table/delete/periods',
                        dataType: 'json',
                        method: 'POST',
                        data: data,
                        success: function(data, response) {
                            $.unblockUI();
                            oTimeTable.fnDeleteRow(nRow);
                            toastr.info('You have successfully deleted Timetable Period');
                        }
                    });

                }
            });



        });
        $('#table-add-class-time-table').on('click', '.save-row-time-table', function(e) {
            e.preventDefault();

            var nRow = $(this).parents('tr')[0];
            var class_id = $(this).parentsUntil('.panel').find('#field-select-time-table-class').val();
            var section_id = $(this).parentsUntil('.panel').find('#field-select-time-table-section').val();
            var day_id = $(this).parentsUntil('.panel').find('#field-select-time-table-day').val();
            var period_id = $(this).parents('tr').attr('id');
            var start_time = $(this).parents('tr').find('#new-input-start-time').val();
            var end_time = $(this).parents('tr').find('#new-input-end-time').val();
            var subject_id = $(this).parents('tr').find('#form-field-select-subject').val();
            var teacher_id = $(this).parents('tr').find('#form-field-select-teacher').val();

            var data = {
                class_id: class_id,
                section_id: section_id,
                day_id: day_id,
                period_id: period_id,
                start_time: start_time,
                end_time: end_time,
                subject_id: subject_id,
                teacher_id: teacher_id
            };

            $.blockUI({
                message: '<i class="fa fa-spinner fa-spin"></i> Do some ajax to sync with backend...'
            });
            $.ajax({
                url: 'http://localhost/projects/schools/public/admin/time/table/add/periods',
                dataType: 'json',
                method: 'POST',
                data: data,
                success: function(data, response) {
                    $.unblockUI();
                    if (data.status === "success") {
                        saveRow(oTimeTable, nRow, data.result);
                        toastr.success('You have successfully added this Period');
                    } else if (data.status === "failed") {
                        oTimeTable.parentsUntil(".panel").find(".errorHandler").removeClass("no-display").html('<p class="help-block alert-danger">' + data.error_messages.start_time + '</p>');
                    }
                }
            });
        });

        $('#table-add-class-time-table').on('click', '.edit-row-time-table', function(e) {
            e.preventDefault();
            if (actualEditingRow) {
                if (newRow) {
                    oTimeTable.fnDeleteRow(actualEditingRow);
                    newRow = false;
                } else {
                    restoreRow(oTimeTable, actualEditingRow);

                }
            }
            var nRow = $(this).parents('tr')[0];

            var rowData = {
                class_id: $(this).parentsUntil('.panel').find('#field-select-time-table-class').val(),
                period_id: $(this).parents('tr').attr('id'),
                subject_id: $(this).parents('tr').attr('data-subject-id'),
                day_id: $(this).parents('tr').attr('data-day-id'),
                section_id: $(this).parents('tr').attr('data-section-id'),
                teacher_id: $(this).parents('tr').attr('data-teacher-id')
            };

            editRow(oTimeTable, nRow, rowData);
            actualEditingRow = nRow;

        });
        var oTimeTable = $('#table-add-class-time-table').dataTable({
            "aoColumnDefs": [{
                    "aTargets": [0]
                }],
            "oLanguage": {
                "sLengthMenu": "Show _MENU_ Rows",
                "sSearch": "",
                "oPaginate": {
                    "sPrevious": "",
                    "sNext": ""
                }
            },
            "aaSorting": [[1, 'asc']],
            "aLengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 10
        });
        $('#table-add-class-time-table_wrapper .dataTables_filter input').addClass("form-control input-sm").attr("placeholder", "Search");
        // modify table search input
        $('#table-add-class-time-table_wrapper .dataTables_length select').addClass("m-wrap small");
        // modify table per page dropdown
        $('#table-add-class-time-table_wrapper .dataTables_length select').select2();
        // initialzie select2 dropdown
        $('#table-add-class-time-table_column_toggler input[type="checkbox"]').change(function() {
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTimeTable.fnSettings().aoColumns[iCol].bVisible;
            oTimeTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });

        $('#field-select-time-table-class').on('change', function() {
            var optionValue = $(this).val();
            oTimeTable.fnClearTable();

            if (optionValue) {
                $('#form-select-section-day').removeClass("no-display");
            } else {
                $('#form-select-section-day').addClass("no-display");
            }

            $('#field-select-time-table-section').empty().append('<option value="">Select a Section...</option>');
            $('#field-select-time-table-day').val("");

            $.blockUI({
                message: '<i class="fa fa-spinner fa-spin"></i> Do some ajax to sync with backend...'
            });

            var data = {
                class_id: optionValue
            };

            $.ajax({
                url: 'http://localhost/projects/schools/public/admin/time/table/get/sections',
                dataType: 'json',
                method: 'POST',
                data: data,
                success: function(data, response) {
                    $.unblockUI();
                    var i;
                    var section = data.result.sections;
                    for (i = 0; i < section.length; i++) {
                        $('#field-select-time-table-section').append('<option value=' + section[i].id + '>' + section[i].section_name + '</option>');
                    }
                }
            });

        });

        $('#field-select-time-table-day').on('change', function() {

            var section_id = $('#field-select-time-table-section').val();
            var day_id = $('#field-select-time-table-day').val();
            oTimeTable.fnClearTable();

            if (section_id) {
                $('#add-row-time-table').removeClass("no-display");
            } else {
                $('#add-row-time-table').addClass("no-display");
            }

            var class_id = $('#field-select-time-table-class').val();

            $.blockUI({
                message: '<i class="fa fa-spinner fa-spin"></i> Do some ajax to sync with backend...'

            });

            var data = {
                section_id: section_id,
                class_id: class_id,
                day_id: day_id
            };

            $.ajax({
                url: 'http://localhost/projects/schools/public/admin/time/table/get/periods',
                dataType: 'json',
                method: 'POST',
                data: data,
                success: function(data, response) {
                    $.unblockUI();
                    var i;
                    for (i = 0; i < data.result.periods.length; i++) {
                        deleteAndCreateTable(oTimeTable, i, data.result.periods);
                    }
                }
            });
            if (newRow) {
                newRow = false;
                actualEditingRow = null;
                var nRow = $(this).parents('tr')[0];
                oTimeTable.fnDeleteRow(nRow);

            }

        });
        function deleteAndCreateTable(oTimeTable, i, periods) {

            var aiNew = oTimeTable.fnAddData(['', '', '', '', '', '', '']);
            var nRow = oTimeTable.fnGetNodes(aiNew[0]);
            nRow.setAttribute('id', periods[i].timings.id);
            nRow.setAttribute('data-subject-id', periods[i].subject.id);
            nRow.setAttribute('data-section-id', periods[i].timings.section_id);
            nRow.setAttribute('data-teacher-id', periods[i].teacher.id);
            nRow.setAttribute('data-day-id', periods[i].timings.day_id);

            oTimeTable.fnUpdate(i + 1, nRow, 0, false);
            oTimeTable.fnUpdate(timeFormat(periods[i].timings.start_time) + " - " + timeFormat(periods[i].timings.end_time), nRow, 1, false);

            oTimeTable.fnUpdate(periods[i].subject.subject_name + '  (' + periods[i].subject.subject_code + ')', nRow, 2, false);
            oTimeTable.fnUpdate(periods[i].teacher.first_name + ' ' + periods[i].teacher.last_name, nRow, 3, false);

            var urls = "http://localhost/projects/schools/public/assets/projects/images/" + periods[i].teacher.pic;
            oTimeTable.fnUpdate('<img class="thumbnail" src="' + urls + '" width="50px" height="50px">', nRow, 4, false);

            oTimeTable.fnUpdate('<a class="edit-row-time-table" href="#">Edit</a>', nRow, 5, false);
            oTimeTable.fnUpdate('<a class="delete-row-time-table" href="#">Delete</a>', nRow, 6, false);

            oTimeTable.fnDraw();

            nRow = false;
        }

        function timeFormat(time) {
            var timeString = time.split(':');
            var AmPm = timeString[1];
            var timeAmPm = AmPm.split(' ');

            if(timeAmPm[1] == "AM" || timeAmPm[1] == "PM"){
                timeAmPm[1] = "";
                timeString[1] = timeAmPm[0]+timeAmPm[1];
            }

            if (timeString[0] > '12') {
                timeString[0] = timeString[0] - 12;
                timeString[2] = 'PM';
            } else {
                timeString[2] = 'AM';
            }
            time = timeString[0] + ':' + timeString[1] + ' ' + timeString[2];
            return time;
        }
    };

    var fetchClasses = function() {
        $.ajax({
            url: 'http://localhost/projects/schools/public/admin/time/table/get/class/streams/pair',
            dataType: 'json',
            method: 'POST',
            success: function(data, response) {
                var i;
                var pairs = data.result.stream_class_pairs;
                for (i = 0; i < pairs.length; i++) {
                    $('#field-select-time-table-class').append('<option value=' + pairs[i].classes_id + '>' + pairs[i].stream_class_pair + '</option>');
                }
            }
        });
    };

    var fetchDays = function() {
    };

    return {
        //main function to initiate template pagesa
        init: function() {
            runDataTable_TimeTable();
            fetchClasses();
        }
    };
}();
