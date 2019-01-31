var fields = [
    {
        "id": "1",
        "label": "Field One",
        "type": "text",
    },
    {
        "id": "2",
        "label": "Field Two",
        "type": "checkbox",
    },
    {
        "id": "3",
        "label": "Field Three",
        "type": "checkbox",
    },
    {
        "id": "4",
        "label": "Field Four",
        "type": "checkbox-list",
        "options": "a|b|c",
    },
    {
        "id": "5",
        "label": "Field Five",
        "type": "radio-list",
        "options": "a|b|c",
    },
    
]

var $customFieldContainer;

$(function () {
    console.log(fields);
    // Get the main div
    $customFieldsContainer = $('#customFieldsContainer');

    $.each(fields, function (i, field) {
        var $customField = $('<div>')
            .addClass('customField');
        var $labelContainer = $('<span>')
            .addClass('customFieldLabel')
            .text(field.label);
        $customField.append($labelContainer);

        var $customFieldControlContainer = $('<div>')
        .addClass('customFieldControl')
        
        var $customFieldControl = $('');
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
    
});