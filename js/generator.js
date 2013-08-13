ctl_counter=0;
t_counter=0;
setvar_counter=0;
rule_counter=1;

$('#menu_box').ready( function() {initialize();});
function getRule() {
    rule = '<tbody id="generator"><div id="rule_div_'+rule_counter+'"> \
        <tr> \
            <th>Si :</th> \
            <td> \
        <select id="conteneur" onclick="handle_conteneur('+rule_counter+')"> \
            <option value="REQUEST_HEADERS"> l\'en-tête de la requête</option> \
            <option value="REQUEST_HEADERS_NAME"> le nom de l\'entête de la requête</option> \
            <option value="request_filename"> l\'url (sans les paramètres get) de la requête</option> \
            <option value="request_uri"> l\'url (avec les paramètres get) de la requête</option> \
            <option value="request_cookies"> les cookies </option> \
            <option value="request_cookies_name"> le nom d\'un cookie </option>\
            <option value="request_method"> la méthode http </option>\
            <option value="args"> les paramètres (post ou get)</option> \
            <option value="args_name"> le nom d\'un paramètre (post ou get)</option>\
            <option value="response_body"> le corps de la réponse</option> \
            <option value="response_headers"> les en-têtes de la réponse </option> \
            <option value="response_headers_name"> le nom d\'un en-tête de la réponse</option>\
            <option value="response_status"> le code retour http</option> \
        </select> \
        </td>\
        </tr><tr>\
        <span id="conteneur_name"> \
        <th>du nom de :</th> \
        <td><input type="text" id="conteneur_text"/> \
        </span></td> \
        </tr><tr>\
        <th><select id="what"> \
            <option value="@contains"> contient </option> \
            <option value="streq"> est Egale </option> \
            <option value="regexp"> correspond à l\'expression régulière </option> \
        </select></th> \
        <td><input type="text" id="what_text"/></td> \
        </tr><th> \
        alors :</th> \
        <td>\
        <select id="ms-action"> \
            <option value="chain"> chaine </option> \
            <option value="phase"> phase </option> \
            <option value="T"> transformation </option> \
            <option value="Pass"> Accepter </option> \
            <option value="Log"> Log </option> \
            <option value="AuditLog"> AuditLog</option> \
            <option value="Ctl"> ctl</option> \
            <option value="Message"> Message</option> \
            <option value="Tag"> Tag </option> \
            <option value="Severity"> Severity </option> \
            <option value="SetVar"> SetVar </option> \
        </select></td> </tr>\
        <tr><th><input type="button" value="Ajouter une action" onclick="addAction('+rule_counter+')" /></th> \
        <td><div id="listAction"> \
        </div> </td></tr>\
        </div></tbody>' ;
        return rule;
    }

function initialize() {
        r = getRule();
        $("#ms-main").append(r);

}

function handle_conteneur(current_rule) {
    var Array = ["REQUEST_FILENAME", "REQUEST_URI","REQUEST_METHOD","RESPONSE_BODY","RESPONSE_STATUS"]
    if (jQuery.inArray($("#rule_div_"+current_rule+" #conteneur").val(),Array) > -1) {
        $("#rule_div_"+current_rule+" #conteneur_name").hide();
    } else {
        $("#rule_div_"+current_rule+" #conteneur_name").show();
    }
}
function addAction(current_rule) {

    dom="";
    if ($("#rule_div_"+current_rule+" #ms-action").val() == "phase") {
        if($("#rule_div_"+current_rule+" #phase")[0] == undefined) {
            dom = '<div id="phase_div_0"><select id="phase" class="optionnal" > \
                <option value="phase:1">Request Headers</option> \
                <option value="phase:2">Request Body</option> \
                <option value="phase:3">Response Headers</option> \
                <option value="phase:4">Response Body</option> \
                <option value="phase:5">Logging</option> \
            </select> \
            <a href="#" onclick="delAction(\'phase\',0,'+current_rule+')"> - </a> \
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "Log") {
        if($("#rule_div_"+current_rule+" #log")[0] == undefined) {
            dom = '<div id="log_div_0"><select id="log" class="optionnal" > \
            <option value="log" >log</option> \
            <option value="nolog" >nolog</option> \
            </select> \
            <a href="#" onclick="delAction(\'log\',0,'+current_rule+')"> - </a> \
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "AuditLog") {
        if($("#rule_div_"+current_rule+" #auditlog")[0] == undefined) {
            dom = '<div id="auditlog_div_0"><select id="auditlog" class="optionnal" > \
            <option value="auditlog" >auditlog</option> \
            <option value="noauditlog" >noauditlog</option> \
            </select> \
            <a href="#" onclick="delAction(\'auditlog\',0,'+current_rule+')"> - </a> \
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "pass") {
        if($("#rule_div_"+current_rule+" #allow")[0] == undefined) {
            dom = '<div id="pass_div_0"><select id="allow" class="optionnal" > \
            <option value="allow" >allow</option> \
            <option value="deny" >deny</option> \
            <option value="block">block</option>\
            <option value="drop">drop</option>\
            <option value="pass">pass</option>\
            </select>\
            <a href="#" onclick="delAction(\'pass\',0,'+current_rule+')"> - </a>\
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "t") {
        t_counter++;
        dom = '<div id="t_div_'+t_counter+'"><select id="trans" class="optionnal"> \
                <option value="t:none"> aucune </option> \
                <option value="t:base64Decode"> base64Decode </option> \
                <option value="t:sqlHexDecode"> sqlHexDecode </option> \
                <option value="t:base64DecodeExt"> base64DecodeExt </option> \
                <option value="t:base64Encode"> base64Encode </option> \
                <option value="t:cmdLine"> cmdLine </option> \
                <option value="t:compressWhitespace"> compressWhitespace </option>\
                <option value="t:cssDecode"> cssDecode </option> \
                <option value="t:escapeSeqDecode"> escapeSeqDecode </option> \
                <option value="t:hexDecode"> hexDecode </option> \
                <option value="t:hexEncode"> hexEncode </option> \
                <option value="t:htmlEntityDecode"> htmlEntityDecode </option> \
                <option value="t:jsDecode"> jsDecode </option> \
                <option value="t:length"> length </option> \
                <option value="t:lowercase"> lowercase </option> \
                <option value="t:md5"> md5 </option> \
                <option value="t:normalisePath"> normalisePath </option> \
                <option value="t:normalisePathWin"> normalisePathWin </option> \
                <option value="t:parityEven7bit"> parityEven7bit </option> \
                <option value="t:parityOdd7bit"> parityOdd7bit </option> \
                <option value="t:parityZero7bit"> parityZero7bit </option> \
                <option value="t:removeNulls"> removeNulls </option> \
                <option value="t:removeWhitespace"> removeWhitespace </option> \
                <option value="t:replaceComments"> replaceComments </option> \
                <option value="t:removeCommentsChar"> removeCommentsChar </option> \
                <option value="t:removeComments"> removeComments </option> \
                <option value="t:replaceNulls"> replaceNulls </option> \
                <option value="t:urlDecode"> urlDecode </option> \
                <option value="t:urlDecodeUni"> urlDecodeUni </option> \
                <option value="t:urlEncode"> urlEncode </option> \
                <option value="t:sha1"> sha1 </option> \
                <option value="t:trimLeft"> trimLeft </option> \
                <option value="t:trimRight"> trimRight </option> \
                <option value="t:trim"> trim </option> \
              </select> \
              <a href="#" onclick=delAction(\'t\','+t_counter+','+current_rule+')> - </a> \
              </div>';
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "chain") {
        if($("#rule_div_"+current_rule+" #chain")[0] == undefined) {
            rule_counter++;
            r = getRule();
            $("#ms-main").append(r);
            dom = '<div id="chain_div_0"><span id="chain"> chain </span> \
            <a href="#" onclick="delAction(\'chain\',0,'+current_rule+');delRule('+rule_counter+')"> - </a>\
            </div>';

        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "message") {
        if ($("#rule_div_"+current_rule+" #msg")[0] == undefined ) {
            dom = '<div id="message_div_0"><input type="text" id="msg" />\
            <a href="#" onclick="delAction(\'message\',0,'+current_rule+')"> - </a> \
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "Severity") {
        if($("#rule_div_"+current_rule+" #severity")[0] == undefined) {
            dom = '<div id="severity_div_0"><select id="severity" class="optionnal" > \
                    <option value="1"> 1 </option> \
                    <option value="2"> 2 </option> \
                    <option value="3"> 3 </option> \
                    <option value="4"> 4 </option> \
                    <option value="5"> 5 </option> \
                    <option value="6"> 6 </option> \
                    <option value="7"> 7 </option> \
                </select>\
                <a href="#" onclick="delAction(\'severity\',0,'+current_rule+')"> - </a>\
                </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "ctl") {
        ctl_counter++;
        dom = '<div id="ctl_div_'+ctl_counter+'"><select id="ctl_'+ctl_counter+'" class="optionnal" > \
                <option value="auditEngine"> auditEngine </option> \
                <option value="auditLogParts"> auditLogParts </option> \
                <option value="debugLogLevel"> debugLogLevel </option> \
                <option value="forceRequestBodyVariable"> forceRequestBodyVariable </option> \
                <option value="requestBodyAccess"> requestBodyAccess </option> \
                <option value="requestBodyLimit"> requestBodyLimit </option> \
                <option value="requestBodyProcessor"> requestBodyProcessor </option> \
                <option value="responseBodyAccess"> responseBodyAccess </option> \
                <option value="responseBodyLimit"> responseBodyLimit </option> \
                <option value="ruleEngine"> ruleEngine </option> \
                <option value="ruleRemoveById"> ruleRemoveById </option> \
                <option value="ruleUpdateTargetById"> ruleUpdateTargetById </option> \
           </select> \
           <input type="text" id="ctl_text_'+ctl_counter+'" /> \
           <a href="#" onclick="delAction(\'ctl\','+ctl_counter+','+current_rule+')"> - </a> \
           </div>';

    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "Tag") {
        if ($("#rule_div_"+current_rule+" #tag")[0] == undefined) {
            dom = '<div id="tag_div_0"><input type="text" id="tag" />\
            <a href="#" onclick="delAction(\'tag\',0,'+current_rule+')"> - </a> \
            </div>';
        }
    }
    else if ($("#rule_div_"+current_rule+" #ms-action").val() == "SetVar") {
        setvar_counter++;
        dom = '<div id="setvar_div_'+setvar_counter+'"><input type="text" id="setvar" />\
        <a href="#" onclick="delAction(\'setvar\','+setvar_counter+','+current_rule+')"> - </a> \
        </div>';
    }


                   $("#rule_div_"+current_rule+" #listAction").append(dom);
           }
function delAction(name,id,id_rule) {
    if ($("#rule_div_"+id_rule+" #"+name+"_div_"+id)[0] != undefined) {
        $("#rule_div_"+id_rule+" #"+name+"_div_"+id).remove();
    } else {
    }

}

function delRule(id_rule) {
    if ($("#rule_div_"+id_rule)[0] != undefined) {
        $("#rule_div_"+id_rule).remove();
    } else {
    }
}

function compute() {
    rule=$("#ms-main").children().first();
    result = "";
    while((rule=rule.next())[0] != undefined) {
        result +=compute_rule(rule)+"\n";
    }
    //console.log(result+";");
    //console.log($("#result"));
    $("#id_rule").html(result);
    $("#id_rule").val(result);
    useGenerator(); 
}

function compute_rule(rule_object) {
    rules = "SecRule "+rule_object.find("#conteneur").val();
    if ((rule_object.find("#conteneur_name")[0] != undefined) && (rule_object.find("#conteneur_text").val() != "")) {
        rules += ":"+rule_object.find("#conteneur_text").val();
    }
    if (rule_object.find("#what").val() != "regexp") {
        rules += " \""+rule_object.find("#what").val()+" "+rule_object.find("#what_text").val()+"\"";
    } else {
        rules += " \""+rule_object.find("#what_text").val()+"\"";
    }
    actions = rule_object.find("#listAction");
    if ((r=actions.children().first()).children().first().val() != undefined) {

        //console.log(r.children().first().text());
        if (r.attr("id").match(/(ctl_div_)\d/)) {
            rules += " \"ctl:"+r.children().first().val()+"="+r.children().next().val();
        }
        else if (r.attr("id").match(/(chain_div_)\d/)) {
            rules += " \""+r.children().first().text();
        }
        else if (r.attr("id").match(/(message_div_)\d/)) {
            rules += " \"msg:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(tag_div_)\d/)) {
            rules += " \"tag:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(severity_div_)\d/)) {
            rules += " \"severity:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(setvar_div_)\d/)) {
            rules += " \"setvar:'"+r.children().first().val()+"'";
        }
        else {
            rules += " \""+r.children().first().val();
        }
    }
    while((r=r.next())[0] != undefined) {

        if (r.attr("id").match(/(ctl_div_)\d/)) {
            rules += ", ctl:"+r.children().first().val()+"="+r.children().next().val();
        }
        else if (r.attr("id").match(/(chain_div_)\d/)) {
            rules += ", "+r.children().first().text();
        }
        else if (r.attr("id").match(/(message_div_)\d/)) {
            rules += ", msg:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(tag_div_)\d/)) {
            rules += ", tag:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(severity_div_)\d/)) {
            rules += ", severity:'"+r.children().first().val()+"'";
        }
        else if (r.attr("id").match(/(setvar_div_)\d/)) {
            rules += ", setvar:'"+r.children().first().val()+"'";
        }
        else {
            rules += ", "+r.children().first().val();
        }
    }
    if (actions.children().first().children().first().val() != undefined) {
        rules += " \""
    }
    return rules;
}
