function matryoshka(tag, count, container, clear_container, include_report){
    /*  Test your browser's ability to handle absurd numbers of nested
        elements. Requires jQuery.

        @param {string} tag           - The name of the tag to generate.
                                        Default: 'div'
        @param {string} count         - How many tags to generate. Default: 100
        @param {string} container     - Conainer tag to fill
                                        Default: 'body'
        @param {bool} clear_container - Clear the container contents before
                                        Default: false
        @param {bool} include_report  - Include a report after. Default: false

        @return {undefined}
    */

    // Default values
    tag = tag || 'div'
    count = count || 100
    container = container || 'body'
    clear_container = clear_container || false
    include_report = include_report || false

    // Capture container jQuery element
    $container = $(container)

    // Set the current element to the container element, clearing its contents
    // if necessary
    var $el = clear_container ? $container.html('') : $container

    // Remove any previously-nested elements
    $('.nested').remove()

    // Create the specified number of elements
    var tick = (new Date).getTime()
    for(var i=1; i<=count; i++){
        $el = $('<'+ tag +'/>', {
            id: i,
            class: 'nested',
            text: (i).toString()
        }).appendTo($el)
    }
    var tock = (new Date).getTime()

    // Stylize the nested elements
    $('.nested').css({
        'border-left': '1px solid',
        'font-size': '8pt',
        'line-height': '10px',
        'margin': '0px',
        'padding': '0px 1px',
    })

    // Create report if necessary
    if(include_report){

        // How long did generation take?
        var duration = tock - tick

        // How many elements were actually created?
        var nr_created = $('.nested').length

        // How many elements are actually visible?
        var nr_visible = $('.nested:visible').length

        // Collect browser information
        var browser_engines = []
        for(var key in $.browser)
            if(key !== 'version')
                browser_engines.push(key)

        // Prepend the report
        $container.prepend(

            // Number of elements created
            nr_created + ' of ' + count + ' ' + tag + 's created (' +
            (nr_created/count*100).toFixed(2) + ' %) in ' + duration +
            ' ms (' + (nr_created/duration).toFixed(2) + ' divs/ms) <br>' +

            // Number of visible elements
            nr_visible + ' of ' + nr_created + ' are visible (' +
            (nr_visible/nr_created*100).toFixed(2) + '%) <br>' +

            // Browser info
            browser_engines.join('/') + ' (ver ' + $.browser.version +
            ')<br><br>' +

            // Reload button
            '<a href="#" onclick="location.reload()">[Clear]</a><hr>'
        )
    }
}
