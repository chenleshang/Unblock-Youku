/*
 * Copyright (C) 2012 Bo Zhu http://zhuzhu.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */


function setText() {
	var getMsg = chrome.i18n.getMessage;
	$('#mode_select strong').html(getMsg('mode_select'));
	$('.mode_lite').html(getMsg('mode_lite'));
	$('.mode_normal').html(getMsg('mode_normal'));
	$('.mode_redirect').html(getMsg('mode_redirect'));
	$('#mode_lite_description').html(getMsg('mode_lite_description'));
	$('#mode_normal_description').html(getMsg('mode_normal_description'));
	$('#mode_redirect_description').html(getMsg('mode_redirect_description'));
	$('#help').html(getMsg('help'));
	$('#feedback').html(getMsg('feedback'));
	$('#rating').html(getMsg('rating'));
	$('#sharing span:first-child').html(getMsg('sharing'));
}


$(document).ready(function() {
    setText();


    var background = chrome.extension.getBackgroundPage();

    // set default button display
    switch (background.get_current_mode()) {
    case 'lite':
        $('#lite').addClass('active');
        break;
    case 'redirect':
        $('#redirect').addClass('active');
        break;
    default:
        $('#normal').addClass('active');
        break;
    }
    

    // button actions
    $('#lite').click(function() {
        background.change_mode('lite');
        console.log('changed mode to lite');
    });
    $('#normal').click(function() {
        background.change_mode('normal');
        console.log('changed mode to normal');
    });
    $('#redirect').click(function() {
        background.change_mode('redirect');
        console.log('changed mode to redirect');
    });
	
	// change language
	$('#language_select').click(function() {
		setLanguage();
		console.log('change language to '+$(this).val());
	});


    var my_date = new Date();
    if (!localStorage.first_time) {
        localStorage.first_time = my_date.getTime();
    } else {
        if (my_date.getTime() - localStorage.first_time > 1000 * 60 * 60 * 24 * 3)
            $('#rating').show(); // delay 3 days for the rating div to show up, hahaha
    }
});

