
Vue.component('home-search-component', {
    template: ' <div class="m_banner_outer_4">\n' +
        '                                <div class="m_banner_outer_5">\n' +
        '                                    <div>\n' +
        '                                        <div class="m_banner_search_section">\n' +
        '                                            <div class="m_banner_search_pre">\n' +
        '                                                <div class="m_banner_search_box">\n' +
        '                                                            <span class="m_banner_search_box_1 m_banner_search_box_2 m_banner_search_box_3">\n' +
        '                                                                <svg xmlns="http://www.w3.org/2000/svg"\n' +
        '                                                                     viewBox="0 0 11 20"><path fill="currentColor"\n' +
        '                                                                                               fill-rule="evenodd"\n' +
        '                                                                                               d="M9.17 19.708L.607 11.444a1.95 1.95 0 0 1 0-2.827L9.232.292c.4-.385 1.048-.39 1.454-.01a.976.976 0 0 1 .011 1.425L2.803 9.324a.975.975 0 0 0 0 1.414l7.831 7.557a.974.974 0 0 1 0 1.413c-.405.39-1.06.39-1.464 0z"></path>\n' +
        '                                                                </svg>\n' +
        '                                                            </span>\n' +
        '                                                </div>\n' +
        '                                                <select class="m_banner_city_box city_selectBox" id = "select_city">\n' +
        '                                                    <option value="تهران">تهران</option>\n' +
        '                                                    <option value="اصفهان">اصفهان</option>\n' +
        '                                                    <option value="شیراز">شیراز</option><option value="مشهد">مشهد</option><option value="تبریز">تبریز</option>\n' +
        '                                                </select>\n' +
        '                                            </div>\n' +
        '                                            <div class="m_banner_empty"></div>\n' +
        '                                        </div>\n' +
        '                                        <div class="m_banner_empty1 m_banner_empty2"></div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="m_banner_region_search">\n' +
        '                                    <div>\n' +
        '                                        <button class="cross_select_city">X</button>\n' +
        '                                        <div class="m_banner_region_search_in">\n' +
        '                                            <div class="m_banner_region_svg1 m_banner_region_svg2">\n' +
        '                                                        <span class="m_banner_region_span1 m_banner_region_span2">\n' +
        '                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13"\n' +
        '                                                                 height="17" viewBox="0 0 13 17"><path\n' +
        '                                                                    fill="currentColor" fill-rule="evenodd"\n' +
        '                                                                    d="M6 0C2.683 0 0 2.66 0 5.95 0 10.412 6 17 6 17s6-6.588 6-11.05C12 2.66 9.317 0 6 0zm0 8a2 2 0 1 1 .001-4.001A2 2 0 0 1 6 8z"></path>\n' +
        '                                                            </svg>\n' +
        '                                                        </span>\n' +
        '                                                <input size="55" list="districts" name="district" id="search_region">\n' +
        '                                                <datalist id="districts">\n' +
        '                                                </datalist>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="m_banner_empty1 m_banner_empty2"></div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <button class="m_baner_button_search" id = "search_button">\n' +
        '                                            <span class="m_baner_button_search_s1 m_baner_button_search_s2">\n' +
        '                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"\n' +
        '                                                     viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path\n' +
        '                                                        d="M0 0h18v18H0z"></path><g stroke="currentColor"\n' +
        '                                                                                    stroke-linecap="round"\n' +
        '                                                                                    stroke-linejoin="round"\n' +
        '                                                                                    stroke-width="2"\n' +
        '                                                                                    transform="translate(2 2)"><circle\n' +
        '                                                        cx="6.125" cy="6.125" r="6.125"></circle><path\n' +
        '                                                        d="M13.373 13.373l-2.767-2.767"></path></g><path\n' +
        '                                                        d="M0 0h18v18H0z"></path></g>\n' +
        '                                                </svg>\n' +
        '                                            </span>\n' +
        '                                </button>\n' +
        '                            </div>'
})

new Vue({
    el: '#home_search'
})
