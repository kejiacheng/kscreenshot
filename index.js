var is = false


$(document).keydown(function (e) {
    if (e.keyCode === 65 && e.shiftKey && !is) {
        is = true
        $('body').css('cursor', 'url("./cursor.png"), auto')
        html2canvas(document.body).then(function(canvas) {
            canvas.style.position = 'fixed'
            canvas.style.top = 0
            canvas.style.left = 0
            canvas.id = 'xixi'
            document.body.appendChild(canvas);

            var startX, startY

            canvas.onmousedown = function look (e) {
                console.log('keke')
                if (e.button !== 0) {
                    return
                }
                startX = e.clientX
                startY = e.clientY
                $('.kankan').remove()
                $('body').append('<div class="kankan"></div>')

                $(document).mousemove(function (e) {
                    var kankan = $('.kankan')

                    kankan.css(
                        {
                            height: Math.abs(e.clientY - startY) + 'px',
                            width: Math.abs(e.clientX - startX) + 'px',
                            top: Math.min(startY, e.clientY) + 'px',
                            left: Math.min(startX, e.clientX) + 'px'
                        }
                    )
                }).unbind('mouseup').mouseup(function (e) {

                    $(document).mousedown(function (e) {
                        if (e.button === 2) {
                            $('.kankan').remove()
                            $('#hehe').remove()
                            canvas.onmousedown = look

                            $(document).contextmenu(function (e) {
                                console.log(e)
                                e.preventDefault()
                            })
                        }
                        console.log(123)
                    })

                    $(document).unbind('mousemove')
                    canvas.onmousedown = null

                    $('#hehe').remove()
                    $('body').append('<canvas id="hehe" width="'+ Math.abs(e.clientX - startX) +'" height="'+ Math.abs(e.clientY - startY) +'" style="position:fixed;top:'+ Math.min(startY, e.clientY) + 'px;left:'+ Math.min(startX, e.clientX) +'px"></canvas>')
                    $(document).unbind('mouseup')
                })
            }
        });
    }
})

$(document).keydown(function (e) {
    if (e.keyCode === 27) {
        $('body').css('cursor', 'default')
        $('#xixi').remove()
        $('#hehe').remove()
        $('.kankan').remove()
        $(document).unbind('mousemove').unbind('mouseup')
    }
})