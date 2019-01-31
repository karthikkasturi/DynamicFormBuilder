var customFields = [
    {
        "id": "1",
        "label": "Textbox",
        "type": "text",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "2",
        "label": "Checkbox",
        "type": "checkbox",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "3",
        "label": "Checkbox",
        "type": "checkbox",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "4",
        "label": "Checkbox List",
        "type": "checkbox-list",
        "options": "option1|option2|option3",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "5",
        "label": "Radio List",
        "type": "radio-list",
        "options": "option1|option2|option3",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "6",
        "label": "Text area",
        "type": "textarea",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "7",
        "label": "Numeric",
        "type": "number",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "8",
        "label": "Date Field",
        "type": "date",
        "required": true,
		"validationMessage": "Field is required",
    },
    {
        "id": "9",
        "label": "DropDownList",
        "type": "dropdown",
        "options": "option1|option2|option3",
        "required": true,
		"validationMessage": "Field is required",
    },
    
]


$(function() {
	addCustomFields(customFields ,'customFieldsContainer');
	$('#btnValidate').click(function(){
		validateForm('customFieldsContainer');
	});
});

function addCustomFields(fields, containerName) {

    // Get the main div
    $customFieldsContainer = $('#' + containerName);

    $.each(fields, function (i, field) {
        var $customField = $('<div>')
            .addClass('customField')
			.attr('data-cf-id', field.id);
        var $labelContainer = $('<div>')
            .addClass('customFieldLabel')
        $labelContainer.append($('<span>')
            .text(field.label)
        );
        if (field.required) {
            // $customField.addClass('required'); 
            $labelContainer.append($('<span>')
            .text('*').addClass('required-indicator'))
        }
         
        $customField.append($labelContainer);

        var $customFieldControlContainer = $('<div>')
        .addClass('customFieldControl');

		var $customFieldControl;
		
        switch (field.type) {
            case 'checkbox-list':
                $.each(field.options.split('|'), function(j, option){
                    $customFieldControl = $('<div>')
                        .addClass('checkbox-list-item');
                    $customFieldControl.append($('<input>')
                    .attr('type', 'checkbox')
                    .attr('id', 'cf_' + field.id + '_' + j)
                    .attr('value', option));
                    $customFieldControl.append($('<label>')
                    .attr('for', 'cf_' + field.id + '_' + j)
                    .text(option));
                    $customFieldControlContainer.append($customFieldControl);
                })
                break;
            case 'radio-list':
                $.each(field.options.split('|'), function(j, option){
                    $customFieldControl = $('<div>')
                        .addClass('radio-list-item');
                    $customFieldControl.append($('<input>')
	                    .attr('type', 'radio')
	                    .attr('id', 'cf_' + field.id + '_' + j)
	                    .attr('value', option)
	                    .attr('name', 'cf_' + field.Id));
                    $customFieldControl.append($('<label>')
	                    .attr('for', 'cf_' + field.id + '_' + j)
	                    .text(option));
                    $customFieldControlContainer.append($customFieldControl);
                })
                break;
            case 'checkbox':
                $customFieldControl = $('<input>')
                    .attr('type', 'checkbox')
                    .attr('id', 'cf_' + field.id)
                $customFieldControlContainer.append($customFieldControl);
                break;
            case 'textarea':
                $customFieldControl = $('<textarea>')
                	.attr('id', 'cf_' + field.id)
                $customFieldControlContainer.append($customFieldControl);
                break;
            case 'number':
                $customFieldControl = $('<input>')
                    .attr('type', 'number')
                    .attr('id', 'cf_' + field.id)
                $customFieldControlContainer.append($customFieldControl);
                break;
            case 'date':
                $customFieldControl = $('<input>')
                    .attr('type', 'date')
                    .attr('id', 'cf_' + field.id)
                $customFieldControlContainer.append($customFieldControl);
                break;
            case 'dropdown':
                $customFieldControl = $('<select>')
                    .attr('id', 'cf_' + field.id);
				$customFieldControl.append($('<option>')
					.attr('disabled', 'disabled')
					.attr('selected', 'true')
					.attr('value', '')
					.css('display', 'none')
					.text('--select an option--')
				);
                $.each(field.options.split('|'), function(j, option){
                    $customFieldControl.append($('<option>')
                        .attr('value', option)
                        .text(option))
                })
                $customFieldControlContainer.append($customFieldControl);
                break;
            case 'text':
            default:
                $customFieldControl = $('<input>')
                    .attr('type', 'text')
                    .attr('id', 'cf_' + field.id)
                $customFieldControlContainer.append($customFieldControl);
                break;
        }
        $customField.append($customFieldControlContainer);
        $customField.append($('<img>')
            .attr('src', 'error-icon.png')
            .attr('alt', 'error-icon.png')
            .addClass('errorIcon')
        );
        $customFieldsContainer.append($customField);
        $customFieldsContainer.append($('<div>')
        .css('clear', 'both'));
    });
}

function validateForm(containerName) {
	var $customFieldsContainer = $('#' + containerName);
	var $customFields = $customFieldsContainer.find('.customField');
	$customFields.removeClass('invalid');
	
	$customFields.each(function(){
		var invalid = false;
		var id = $(this).attr('data-cf-id');
		var cf = customFields.filter(function(x){ return x.id == id; });
		if(cf.length > 0) cf= cf[0];
		if(cf.required) {
			switch (cf.type) {
				case 'text':
					if($(this).find('input[type="text"]').val().trim().length === 0){
						invalid = true;
					}
					break;
				case 'checkbox':
					if(!$(this).find('input[type="checkbox"]').prop('checked')){
						invalid = true;
					}
					break;
				case 'checkbox-list':
					invalid = true;
					$(this).find('input[type="checkbox"]').each(function(){
						if($(this).prop('checked')){
							invalid = false;
						}
					})
					break;
				case 'radio-list':
					invalid = true;
					$(this).find('input[type="radio"]').each(function(){
						if($(this).prop('checked')){
							invalid = false;
						}
					})
					break;
				case 'textarea':
					if($(this).find('textarea').val().trim().length === 0){
						invalid = true;
					}
					break;
				case 'number':
					if($(this).find('input[type="number"]').val().trim().length === 0){
						invalid = true;
					}
					break;
				case 'date':
					if($(this).find('input[type="date"]').val().trim().length === 0){
						invalid = true;
					}
					break;
				case 'dropdown':
					if($(this).find(':selected').val().trim().length === 0){
						invalid = true;
					}
					break;
			}
		}
		if (invalid) {
			$(this).addClass('invalid');
			$(this).find('.errorIcon').attr('title', cf.validationMessage);
		}
	})
	
}