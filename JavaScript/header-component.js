
Vue.component('header-component', {
    template: '<div class="Header_O_General">\n' +
        '        <div class="Header_Presentation"></div>\n' +
        '            <div class="m_header_1 m_header_2">\n' +
        '                <div class="m_header_presentation">\n' +
        '                    <div class="m_header_lr">\n' +
        '                        <ul>\n' +
        '                            <li class="m_header_lr_option"><a href="login.html#login_section" rel="nofollow" >ورود</a></li>\n' +
        '                            <li class="m_header_lr_line"></li>\n' +
        '                            <li class="m_header_lr_option"><a href="login.html#register_section" rel="nofollow">عضویت</a></li>\n' +
        '                        </ul>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <ul class="m_header_guide m_header_guide2">\n' +
        '                    <li class="m_header_lr_option"><a rel="nofollow" href="">راهنما</a></li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '    </div>'
})

new Vue({ el: '#header-c' })
