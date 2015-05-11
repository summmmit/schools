<?php
/*
 * Unauthenticated Group
 */
Route::group(array('prefix' => 'admin', 'before' => 'guest'), function() {

    /*
     * CSRF protection
     */
    Route::group(array('before' => 'csrf'), function() {
        /*
         *  Admin Sign-in (post)
         */
        Route::Post('/sign/in/post', array(
            'as' => 'admin-sign-in-post',
            'uses' => 'AdminLoginController@postSignIn'
        ));
        /*
         *  Admin Create Account (post)
         */
        Route::Post('/account/create', array(
            'as' => 'admin-account-create-post',
            'uses' => 'AdminLoginController@postCreate'
        ));
        /*
         *  Admin Sign-in (post)
         */
        Route::Post('/forgot/password/post', array(
            'as' => 'admin-forgot-password-post',
            'uses' => 'AdminLoginController@postForgotPassword'
        ));
        /**
         * Admin Store New Password
         */
        Route::Post('/store/new/password/post', array(
            'as' => 'admin-store-new-password-post',
            'uses' => 'AdminLoginController@postStoreNewPassword'
        ));
    });
    /*
     * Admin Create Account (get)
     */
    Route::get('/account/create', array(
        'as' => 'admin-account-create',
        'uses' => 'AdminLoginController@getCreate'
    ));
    /*
     * Admin SignIn Account (get)
     */
    Route::get('/sign/in', array(
        'as' => 'admin-sign-in',
        'uses' => 'AdminLoginController@getSignIn'
    ));
    /*
     * Admin Activate Account (get)
     */
    Route::get('/{userid}/activate/{code}', array(
        'as' => 'admin-account-activate',
        'uses' => 'AdminLoginController@getActivate'
    ));
    /*
     * Admin Forgot password (get)
     */
    Route::get('/forgot/password', array(
        'as' => 'admin-forgot-password',
        'uses' => 'AdminLoginController@getForgotPassword'
    ));
    /*
     * Admin Recover Account (get)
     */
    Route::get('/reset/password', array(
        'as' => 'admin-reset-password',
        'uses' => 'AdminLoginController@getResetPassword'
    ));
});

/*
 * Authenticated Group
 */
Route::group(array('prefix' => 'admin', 'before' => 'Adminauth'), function() {

    /*
     * CSRF protection
     */
    Route::group(array('before' => 'csrf'), function() {

        /*
         *  Edit Admin Details (post)
         */
        Route::Post('/edit', array(
            'as' => 'admin-edit-post',
            'uses' => 'AdminLoginController@postEdit'
        ));
        /*
         *  Change Admin login Details (post)
         */
        Route::Post('/login/details', array(
            'as' => 'admin-login-details-post',
            'uses' => 'AdminLoginController@postChangePassword'
        ));
        /*
         * Admin Time Table Set (post)
         */
        Route::Post('/time/table', array(
            'as' => 'admin-time-table-post',
            'uses' => 'AdminTimeTableController@postTimeTableCreate'
        ));
    });
    /*
     * non - protection Routes
     *
     * SignOUt (get)
     */
    Route::get('/sign/out', array(
        'as' => 'admin-sign-out',
        'uses' => 'AdminAccountController@getSignOut'
    ));
    /*
     * User Welcome Settings (get)
     */
    Route::get('/welcome/settings', array(
        'as' => 'admin-welcome-settings',
        'uses' => 'AdminLoginController@getWelcomeSettings'
    ));
    /*
     * Admin Home (get)
     */
    Route::get('/home', array(
        'as' => 'admin-home',
        'uses' => 'AdminLoginController@getAdminHome'
    ));
    /*
     * Admin Profile (get)
     */
    Route::get('/profile', array(
        'as' => 'admin-profile',
        'uses' => 'AdminLoginController@getAdminProfile'
    ));
    /*
     * Admin Time Table Set (get)
     */
    Route::get('/time/table', array(
        'as' => 'admin-time-table',
        'uses' => 'AdminTimeTableController@getTimeTableCreate'
    ));

    /**
     * Time Table Settings 
     */
    /*
     * Admin Get Class and Streams Pair  (post)
     */
    Route::Post('/time/table/get/class/streams/pair', array(
        'as' => 'admin-time-table-get-class-streams-pair',
        'uses' => 'AdminTimeTableController@postGetClassStreamPair'
    ));
    /*
     * Admin Classes Add or Edit (post)
     */
    Route::Post('/time/table/add/classes', array(
        'as' => 'admin-time-table-add-classes-post',
        'uses' => 'AdminTimeTableController@postAddClasses'
    ));
    /*
     * Admin Classes Delete (post)
     */
    Route::Post('/time/table/delete/classes', array(
        'as' => 'admin-time-table-delete-classes-post',
        'uses' => 'AdminTimeTableController@postDeleteClasses'
    ));
    /*
     * Admin Classes get (post)
     */
    Route::Post('/time/table/get/classes', array(
        'as' => 'admin-time-table-get-classes-post',
        'uses' => 'AdminTimeTableController@postGetClasses'
    ));
    /*
     * Admin Streams  (post)
     */
    Route::Post('/time/table/get/streams', array(
        'as' => 'admin-time-table-get-streams',
        'uses' => 'AdminTimeTableController@postGetStreams'
    ));
    /*
     * Admin Streams Add or Edit (post)
     */
    Route::Post('/time/table/add/stream', array(
        'as' => 'admin-time-table-add-stream-post',
        'uses' => 'AdminTimeTableController@postAddStreams'
    ));
    /*
     * Admin Streams Delete (post)
     */
    Route::Post('/time/table/delete/stream', array(
        'as' => 'admin-time-table-delete-stream-post',
        'uses' => 'AdminTimeTableController@postDeleteStreams'
    ));
    /*
     * Admin get Sections (post)
     */
    Route::Post('/time/table/get/sections', array(
        'as' => 'admin-time-table-get-sections-post',
        'uses' => 'AdminTimeTableController@postGetSections'
    ));
    /*
     * Admin Sections Add or Edit (post)
     */
    Route::Post('/time/table/add/sections', array(
        'as' => 'admin-time-table-add-sections-post',
        'uses' => 'AdminTimeTableController@postAddSections'
    ));
    /*
     * Admin Sections Delete (post)
     */
    Route::Post('/time/table/delete/sections', array(
        'as' => 'admin-time-table-delete-sections-post',
        'uses' => 'AdminTimeTableController@postDeleteSections'
    ));
    /*
     * Admin Subjects  (post)
     */
    Route::Post('/time/table/get/subjects', array(
        'as' => 'admin-time-table-get-subjects',
        'uses' => 'AdminTimeTableController@postGetSubjects'
    ));
    /*
     * Admin Sections Add or Edit (post)
     */
    Route::Post('/time/table/add/subjects', array(
        'as' => 'admin-time-table-add-subjects-post',
        'uses' => 'AdminTimeTableController@postAddSubjects'
    ));
    /*
     * Admin Sections Delete (post)
     */
    Route::Post('/time/table/delete/subjects', array(
        'as' => 'admin-time-table-delete-subjects-post',
        'uses' => 'AdminTimeTableController@postDeleteSubjects'
    ));
    /*
     * Admin Timetable  (post)
     */
    Route::get('/time/table/get/create', array(
        'as' => 'admin-create-time-table',
        'uses' => 'AdminTimeTableController@getCreateTimeTable'
    ));
    /*
     * Admin get TimeTable by Class  (post)
     */
    Route::Post('/time/table/get/periods', array(
        'as' => 'admin-time-table-get-periods',
        'uses' => 'AdminTimeTableController@postGetPeriods'
    ));
    /*
     * Admin get TimeTable by Class  (post)
     */
    Route::Post('/time/table/add/periods', array(
        'as' => 'admin-time-table-add-periods',
        'uses' => 'AdminTimeTableController@postAddPeriods'
    ));
    /*
     * Admin Period Delete (post)
     */
    Route::Post('/time/table/delete/periods', array(
        'as' => 'admin-time-table-delete-periods-post',
        'uses' => 'AdminTimeTableController@postDeletePeriods'
    ));
    /*
     * Admin get All the Teachers  (post)
     */
    Route::Post('/time/table/get/teachers', array(
        'as' => 'admin-time-table-get-teachers',
        'uses' => 'AdminTimeTableController@postGetTeachers'
    ));
    /*
     * 
     * School Settings 
     * 
     */
    /*
     * Admin School Test  (post)
     */
    Route::get('/school/test', array(
        'as' => 'admin-school-test',
        'uses' => 'SchoolController@getSchoolTest'
    ));
    /*
     * School All settings (get)
     */
    /*
     * Set Initial School Session
     */
    Route::get('/school/set/sessions', array(
        'as' => 'admin-school-set-sessions',
        'uses' => 'AdminLoginController@getSetSchoolSessions'
    ));
    /*
     * Set Initial School Session (post)
     */
    Route::Post('/school/set/sessions/post', array(
        'as' => 'admin-school-set-sessions-post',
        'uses' => 'SchoolSettingsController@postSetSchoolSessions'
    ));
    /*
     * Set Initial School Schedule (post)
     */
    Route::Post('/school/set/schedule/post', array(
        'as' => 'admin-school-set-schedule-post',
        'uses' => 'SchoolSettingsController@postSetSchoolSchedule'
    ));
    /*
     *
     */
    Route::get('/school/sessions', array(
        'as' => 'admin-school-sessions',
        'uses' => 'SchoolSettingsController@getSchoolSessions'
    ));
    /*
     * School All settings Ajax  (post)
     */
    Route::get('/school/settings', array(
        'as' => 'admin-school-settings',
        'uses' => 'SchoolSettingsController@getSchoolSettings'
    ));
    /*
     * School Timinings Daily Start From Ajax (post)
     */
    Route::Post('/ajax/school/timings/start/from', array(
        'as' => 'admin-ajax-school-timings-start-from',
        'uses' => 'SchoolSettingsController@postScheduleStartFrom'
    ));
    /*
     * School Timinings Daily Lunch From Ajax (post)
     */
    Route::Post('/ajax/school/timings/lunch/from', array(
        'as' => 'admin-ajax-school-timings-lunch-from',
        'uses' => 'SchoolSettingsController@postScheduleLunchFrom'
    ));
    /*
     * School Timinings Daily Closing From Ajax (post)
     */
    Route::Post('/ajax/school/timings/close/from', array(
        'as' => 'admin-ajax-school-timings-close-from',
        'uses' => 'SchoolSettingsController@postScheduleCloseFrom'
    ));
    /**
     * Get All School Students
     */
    Route::get('/school/students', array(
        'as' => 'admin-school-students',
        'uses' => 'SchoolSettingsController@getSchoolStudents'
    ));
    /**
     * Get All School Teachers
     */
    Route::get('/school/teachers', array(
        'as' => 'admin-school-teachers',
        'uses' => 'SchoolSettingsController@getSchoolTeachers'
    ));
    /**
     * Get or Create New School Events
     */
    Route::get('/school/events', array(
        'as' => 'admin-school-events',
        'uses' => 'SchoolSettingsController@getSchoolEvents'
    ));
    /**
     * Api for getting the events types for new event calendar
     */
    Route::Post('/get/event/types', array(
        'as' => 'admin-get-event-types',
        'uses' => 'SchoolSettingsController@postGetEventTypes'
    ));
    /**
     * Api for creating Event
     */
    Route::Post('/create/event', array(
        'as' => 'admin-create-event',
        'uses' => 'SchoolSettingsController@postCreateEvent'
    ));
    /**
     * Api for Getting all the Events
     */
    Route::Post('/get/events', array(
        'as' => 'admin-get-events',
        'uses' => 'SchoolSettingsController@postGetEvent'
    ));
    
});
