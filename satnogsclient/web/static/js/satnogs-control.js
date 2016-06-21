// Initialize status page
$(document).ready(function() {

    setInterval(function(){
      query_control_backend({}, 'POST', '/control_rx', true);
    }, 10000);

    datepicker = $('#datetimepicker1').datetimepicker();

    var backend = "gnu-radio";

    $("#comms-gnu").click(function() {

      backend = "gnu-radio";

      $("#comms-gnu").css('background-color','#5cb85c');
      $("#comms-ser").css('background-color','#d9534f');
    });

    $("#comms-ser").click(function() {

      backend = "serial";

      $("#comms-gnu").css('background-color','#d9534f');
      $("#comms-ser").css('background-color','#5cb85c');
    });

    $("#custom-select").click(function() {
      display_service('service-param-custom');
    });

    $("#power-select").click(function() {
      display_service('service-param-power');
    });

    $("#test-select").click(function() {
      display_service('service-param-test');
    });

    $("#time-select").click(function() {
      display_service('service-param-time');
    });

    $("#tle-select").click(function() {
      display_service('service-param-tle');
    });

    function display_service(selection) {

      var r1 = 'service-param-custom';
      var r2 = 'service-param-power';
      var r3 = 'service-param-test';
      var r4 = 'service-param-time';
      var r5 = 'service-param-tle';

      if(selection == r1) {
        r1 = r5;
      }
      else if(selection == r2) {
        r2 = r5;
      }
      else if(selection == r3) {
        r3 = r5;
      }
      else if(selection == r4) {
        r4 = r5;
      }
      else if(selection == r5) {

      }

      var elem = document.getElementById(r1);
      elem.style.display = "none";

      var elem = document.getElementById(r2);
      elem.style.display = "none";

      var elem = document.getElementById(r3);
      elem.style.display = "none";

      var elem = document.getElementById(r4);
      elem.style.display = "none";

      var elem = document.getElementById(selection);
      elem.style.display = "block";

    }

    $('#service-param-panel select').on('change', function() {
        // Handle change on service parameter dropdowns
    });

    $('#service-param-service_type').on('change', function() {
        // Handle change on service parameter dropdowns
        var subservice = $(this).find("option:selected").text();

        var VR_SERVICE = {
            TM_VR_ACCEPTANCE_SUCCESS: 1,
            TM_VR_ACCEPTANCE_FAILURE: 2
        };

        var HK_SERVICE = {
            TC_HK_REPORT_PARAMETERS: 21,
            TM_HK_PARAMETERS_REPORT: 23
        };

        var EV_SERVICE = {
            TM_EV_NORMAL_REPORT: 1,
            TM_EV_ERROR_REPORT: 4
        };

        var FM_SERVICE = {
            TC_FM_PERFORM_FUNCTION: 1
        };

        var SC_SERVICE = {
            TC_SC_ENABLE_RELEASE: 1,
            TC_SC_DISABLE_RELEASE: 2,
            TC_SC_RESET_SCHEDULE: 3,
            TC_SC_INSERT_TC: 4,
            TC_SC_DELETE_TC: 5,
            TC_SC_TIME_SHIFT_SPECIFIC: 7,
            TC_SC_TIME_SHIFT_SELECTED_OTP: 8,
            TC_SC_TIME_SHIFT_ALL: 15
        };

        var LD_SERVICE = {
            TM_LD_FIRST_DOWNLINK: 1,
            TC_LD_FIRST_UPLINK: 9,
            TM_LD_INT_DOWNLINK: 2,
            TC_LD_INT_UPLINK: 10,
            TM_LD_LAST_DOWNLINK: 3,
            TC_LD_LAST_UPLINK: 11,
            TC_LD_ACK_DOWNLINK: 5,
            TM_LD_ACK_UPLINK: 14,
            TC_LD_REPEAT_DOWNLINK: 6,
            TM_LD_REPEAT_UPLINK: 15,
            TM_LD_REPEATED_DOWNLINK: 7,
            TC_LD_REPEATED_UPLINK: 12,
            TM_LD_ABORT_SE_DOWNLINK: 4,
            TC_LD_ABORT_SE_UPLINK: 13,
            TC_LD_ABORT_RE_DOWNLINK: 8,
            TM_LD_ABORT_RE_UPLINK: 16
        };

        var MS_SERVICE = {
            TC_MS_ENABLE: 1,
            TC_MS_DISABLE: 2,
            TC_MS_CONTENT: 8,
            TC_MS_DOWNLINK: 9,
            TC_MS_DELETE: 11,
            TC_MS_REPORT: 12,
            TM_MS_CATALOGUE_REPORT: 13,
            TC_MS_UPLINK: 14,
            TC_MS_FORMAT: 15
        };

        var CT_SERVICE = {
            TC_CT_PERFORM_TEST: 1,
            TM_CT_REPORT_TEST: 2
        };

        var $select = $('#service-param-service_subtype');
        $select.find('option').remove();
        $select.append('<option selected="true" style="display:none;">Service sub Type</option>');

        if (subservice == "TC_VERIFICATION_SERVICE") {
            for (key in VR_SERVICE) {
                $select.append('<option value=' + VR_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_HOUSEKEEPING_SERVICE") {
            for (key in HK_SERVICE) {
                $select.append('<option value=' + HK_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_EVENT_SERVICE") {
            for (key in EV_SERVICE) {
                $select.append('<option value=' + EV_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_FUNCTION_MANAGEMENT_SERVICE") {
            for (key in FM_SERVICE) {
                $select.append('<option value=' + FM_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_TIME_MANAGEMENT_SERVICE") {
            for (key in VR_SERVICE) {
                $select.append('<option value=' + VR_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_SCHEDULING_SERVICE") {
            for (key in SC_SERVICE) {
                $select.append('<option value=' + SC_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_LARGE_DATA_SERVICE") {
            for (key in LD_SERVICE) {
                $select.append('<option value=' + LD_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_MASS_STORAGE_SERVICE") {
            for (key in MS_SERVICE) {
                $select.append('<option value=' + MS_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_TEST_SERVICE") {
            for (key in CT_SERVICE) {
                $select.append('<option value=' + CT_SERVICE[key] + '>' + key + '</option>');
            }
        } else if (subservice == "TC_SU_MNLP_SERVICE") {
            for (key in VR_SERVICE) {
                $select.append('<option value=' + VR_SERVICE[key] + '>' + key + '</option>');
            }
        }
    });

    $('#service-param-time-report').on('change', function() {
      elem = document.getElementById('datetimepicker1');
      if ($('#service-param-time-report').find("option:selected").val() == "manual") {
        elem.style.display = "table";
      }
      else {
        elem.style.display = "none";
      }
    });

    $('#service-param-panel :button').on('click', function() {
        //TODO: Check whether all required fields are selected
        var list = $('this').parent().siblings().find('select');
        var selected_value = $('#service-select').val();
        var missing = [];
        var flag = true;
        for (i = 0; i < list.length; i++) {
            if (isNaN(list[i].value)) {
                missing.push(list[i].value);
                flag = false;
            }
        }

        if (selected_value == "Custom") {
            var app_id = $('#service-param-app_id').val();
            var type = $('#service-param-type').val();
            var ack = $('#service-param-ack').val();
            var service_type = $('#service-param-service_type').val();
            var service_subtype = $('#service-param-service_subtype').val();
            var dest_id = $('#service-param-dest_id').val();

            var data = $('#service-param-service-data').val().split(",");
        } else if (selected_value == "Power") {
            var dev_id = $('#service-param-dev-id').val();
            var type = 1;
            var ack = $('#service-param-power-ack').val();

            var service_type = 8;
            var service_subtype = 1;
            var dest_id = $('#service-param-power-dest_id').val();

            if (dev_id == 1) {
                var app_id = 2;
            } else if (dev_id == 2) {
                var app_id = 2;
            } else if (dev_id == 3) {
                var app_id = 2;
            } else if (dev_id == 4) {
                var app_id = 2;
            } else if (dev_id == 5) {
                var app_id = 1;
            } else if (dev_id == 6) {
                var app_id = 2;
            } else if (dev_id == 7) {
                var app_id = 3;
            } else if (dev_id == 8) {
                var app_id = 1;
            } else if (dev_id == 9) {
                var app_id = 3;
            } else if (dev_id == 10) {
                var app_id = 3;
            } else if (dev_id == 11) {
                var app_id = 3;
            } else if (dev_id == 12) {
                var app_id = 3;
            } else if (dev_id == 13) {
                var app_id = 3;
            } else if (dev_id == 14) {
                var app_id = 3;
            } else if (dev_id == 15) {
                var app_id = 3;
            }

            var fun_id = $('#service-param-function').val();
            var data = [ fun_id, dev_id];
        } else if (selected_value == "Test") {
            var app_id = $('#service-param-test-app_id').val();
            var type = 1;
            var ack = 0;

            var service_type = 17;
            var service_subtype = 1;
            var dest_id = $('#service-param-test-dest_id').val();
            var data = [];
        } else if (selected_value == "Time") {
            // TODO: Is app_id needed in time service?
            //var app_id = $('#service-param-time-app_id').val();
            var app_id = 1;
            var type = 1;
            var ack = 0;

            var service_type = 17;
            var service_subtype = 1;
            var dest_id = $('#service-param-time-dest_id').val();

            selected_action = $('#service-param-time-report').find("option:selected").val();

            if (selected_action == 'manual') {
              var datetime = datepicker.data("DateTimePicker").date();
              var data = [datetime.utc().format().toString()];
            }
            else if (selected_action == 'auto') {
              var data = [moment().utc().format().toString()];
            }
            else {
              data = [];
            }
        } else if (selected_value == "ADCS TLE update") {
            // TODO: Is app_id needed in time service?
            //var app_id = $('#service-param-time-app_id').val();
            var app_id = 7;
            var type = 0;
            var ack = 0;

            var service_type = 3;
            var service_subtype = 23;
            var dest_id = 3;

            data = [];
            ascii_to_dec($('#service-param-service-tle').val().split(''), data);
            data.unshift(6);
            //number of TLE chanacters
            if(data.length != 137) { 
              alert("TLE shouldnt be: " + data.length); 
              return 0; 
            }

        }

        if (flag) {
            request = encode_service(type, app_id, service_type, service_subtype, dest_id, ack, data);
            query_control_backend(request, 'POST', '/command', true);
        } else {
            alert('Please fill ' + missing);
        }
    });

    $("#comms-tx-on").click(function() {
        request = encode_comms_tx_rf(1);
        query_control_backend(request, 'POST', '/command', true);
    });

    $("#comms-tx-off").click(function() {
        request = encode_comms_tx_rf(0);
        query_control_backend(request, 'POST', '/command', true);
    });

    $("#time-radio").change(function() {
        // If checkbox not checked already
        if ($('input[name=power-radio]').prop('checked') == true) {
            var elem = document.getElementById('subservice-params-time');
            var elem2 = document.getElementById('subservice-params-power');
            elem.style.display = "block";
            elem2.style.display = "none";
            $('input[name=power-radio]').prop('checked', false);
            // TODO: Uncheck every other radio
        }
    });

    $("#datetimepicker1").on({
        click: function() {
          $(this).show();
        },
        toggle: function() {
        }
    });


    //    $(':file').change(function(){
    //       // var file = this.files[0];
    //       // var name = file.name;
    //       // var size = file.size;
    //       // var type = file.type;
    //       //Your validation
    //   });
    //
    //   $(':button').click(function(){
    //     var formData = new FormData($('form')[0]);
    //     $.ajax({
    //         url: '/raw',  //Server script to process data
    //         type: 'POST',
    //         xhr: function() {  // Custom XMLHttpRequest
    //             var myXhr = $.ajaxSettings.xhr();
    //             if(myXhr.upload){ // Check if upload property exists
    //                 myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
    //             }
    //             return myXhr;
    //         },
    //         //Ajax events
    //         // beforeSend: beforeSendHandler,
    //         // success: completeHandler,
    //         // error: errorHandler,
    //         // Form data
    //         data: formData.get('file'),
    //         //Options to tell jQuery not to process data or worry about content-type.
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
    // });
    //
    // function progressHandlingFunction(e){
    //     if(e.lengthComputable){
    //         $('progress').attr({value:e.loaded,max:e.total});
    //     }
    // }

    //  $("#fileinput").click(function(){
    //     input = document.getElementById('fileinput');
    //
    //     file = input.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function(){
    //         var binaryString = this.result;
    //         $.ajax({
    //            url: '/raw',
    //            type: 'POST',
    //            contentType: 'application/octet-stream',
    //            data: binaryString,
    //            processData: false
    //         });
    //       };
    //     data = reader.readAsBinaryString(file);
    //
    //  });

    $("#send-cmd").click(function() {
        if ($("#command-btn:first-child").text() == 'Test Service') {
            request = encode_test_service();
        } else {
            alert('Invalid command');
            request = false;
        }
        query_control_backend(request, 'POST', '/command', true);
    });

    function ascii_to_dec(inc, out) {
      for (var i = 0; i < inc.length; i++) {
        out[i] = inc[i].charCodeAt(0);
      }
    }

    function encode_service(type, app_id, service_type, service_subtype, dest_id, ack, data) {
        var DataFieldHeader = new Object();
        DataFieldHeader.CCSDSSecondaryHeaderFlag = '0';
        DataFieldHeader.TCPacketPUSVersionNumber = '1';
        DataFieldHeader.Ack = ack;
        DataFieldHeader.ServiceType = service_type;
        DataFieldHeader.ServiceSubType = service_subtype;
        DataFieldHeader.SourceID = dest_id;
        DataFieldHeader.Spare = '0';

        var PacketID = new Object();
        PacketID.VersionNumber = '0';
        PacketID.Type = type;
        PacketID.DataFieldHeaderFlag = '1';
        PacketID.ApplicationProcessID = app_id;

        var PacketSequenceControl = new Object();
        PacketSequenceControl.SequenceFlags = '3';
        PacketSequenceControl.SequenceCount = '59';

        var PacketDataField = new Object();
        PacketDataField.DataFieldHeader = DataFieldHeader;
        PacketDataField.ApplicationData = '';
        PacketDataField.Spare = '0';
        PacketDataField.PacketErrorControl = '5';

        if (typeof data != "undefined") {
            PacketDataField.ApplicationData = data;
        }


        var PacketHeader = new Object();
        PacketHeader.PacketID = PacketID;
        PacketHeader.PacketSequenceControl = PacketSequenceControl;
        PacketHeader.PacketLength = '66';

        var TestServicePacket = new Object();
        TestServicePacket.PacketHeader = PacketHeader;
        TestServicePacket.PacketDataField = PacketDataField;

        var ecss_cmd = new Object();
        ecss_cmd.ecss_cmd = TestServicePacket;
        ecss_cmd.backend = backend;

        console.log(JSON.stringify(ecss_cmd));
        var json_packet = JSON.stringify(ecss_cmd);
        return json_packet;
    }

    function encode_comms_tx_rf(status) {
        var response = new Object();
        var custom_cmd = new Object();
        var comms_tx_rf = new Object();
        if (status) {
            custom_cmd.comms_tx_rf = 'comms_on';
        } else {
            custom_cmd.comms_tx_rf = 'comms_off';
        }
        response.custom_cmd = custom_cmd;
        console.log(JSON.stringify(response));
        var json_packet = JSON.stringify(response);
        return json_packet;
    }

    function print_command_response(data) {
      var response_panel = document.getElementById('response-panel-body');
      if (data.hasOwnProperty('Response')) {
        response_panel.innerHTML += '[' + moment().format().toString() + ']: ' + data['Response'];
      }
      else if (data.hasOwnProperty('ECSS_RX')) {
        response_panel.innerHTML += '[' + moment().format().toString() + ']: ' + data['ECSS_RX'];
      }
      response_panel.innerHTML += '<br>';
      response_panel.scrollTop = response_panel.scrollHeight;
    }

    function query_control_backend(JSONData, localMode, url, param) {
        var localJSONData = JSONData;
        var postMode = localMode;

        $.ajax({
            type: postMode,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSONData,
            success: function(data) {
                print_command_response(data);
            },
            error: function(data) {
            }
        });
    }

});
