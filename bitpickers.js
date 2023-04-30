function fetchEvent() {
  var url = "https://connpass.com/api/v1/event/?series_id=8076";
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText()).events[0].event_url;
}

function postToDiscord() {

  var payload = {
    "avatar_url": "https://connpass.com/static/img/api/connpass_logo_1.png"
  };

    payload.content = fetchEvent();

    var lastContent = PropertiesService.getScriptProperties().getProperty('lastContent');
    lastContent == payload.content ? null : PropertiesService.getScriptProperties().setProperty('lastContent', payload.content);

    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
    var webhook = "https://discord.com/api/webhooks/${webhook_id}/${webhook_token}";
    UrlFetchApp.fetch(webhook, options);
}
