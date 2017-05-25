/**
* @author Paulo Marcos Soares Rodrigues <paulomarcsr@gmail.com>
* @name Sign Language Translate
* @license Creative Commons
* @purpose Make possible the sign language internationalization
**/

(function signlang (){
var sltranslate =
$(document).ready(function main (){
    var $body = document.body;
    var optionMenu = document.createElement('select');
    var optionID = optionMenu.setAttribute('id','sl-menu');
    $body.appendChild(optionMenu);
    var $menu = $("#sl-menu");
    var $option = $(document.getElementsByTagName("option"));
    $.getJSON('i18n/config.json', function confiJSON (jd) {
        $menu.append('<option>'+jd.default+'</option>');
        $.each(jd.languages, function setMenu (i, value){
            var option = $('<option/>').val(value.idLang).text(value.name);
            $menu.append(option);
            var $e = document.getElementById('sl-menu');
            $e.addEventListener('change',function setItem (){
                var selectedItem = $e.options[$e.selectedIndex].text;
                var selectedValue= $e.options[$e.selectedIndex].value;
                if (selectedValue===value.idLang) {
                        var p = value.path;
                        $.getJSON(p, function setSignLang (j){
                            var r = $('[signlang]');
                            for (var b = 0; b < r.length; b++) {
                                var at = r[b];
                                var i18n = at.getAttribute('signlang');
                                        var w = i18n.split(".");
                                        var x = null;                            
                                        for (i = 0; i < w.length; i++) {
                                            if(x===null){
                                            x = j[w[i]];
                                            }else{
                                                x = x[w[i]];
                                            }
                                        }
                                        var video = x;
                                        at.setAttribute('src', video);
                                }
                        });
                } else {
                        if(selectedItem===jd.default){
                            $('iframe').hide();
                        }else{
                            $('iframe').show();
                        }
                    }
                });
            });
        });
});
})();
