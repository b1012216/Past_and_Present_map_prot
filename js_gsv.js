//(c)2013 kazu.

var streetView;

function initialize() { //初期設定

  //ストリートビュー設定
  var streetViewOptions = {
    pov: {heading: 0,pitch: 0,zoom: 1},		//初期の方角：仰角：視野
    pano : "pano_01",			//初期のパノラマID
    panControl : false,
    panoProvider : getCustomPanorama
  };

  var streetViewDiv = document.getElementById("streetview_canvas");  //ｽﾄﾘｰﾄﾋﾞｭｰ表示DIVコンテナ設定
  streetView = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);

  //リンクの登録
  google.maps.event.addListener(streetView, "links_changed", createCustomLink);		//links_changedでcreateCustomLinkへ
}

function getCustomPanoramaTileUrl(panoID, zoom, tileX, tileY) {				//タイル画像読み込み
  return 'pano_images/' + panoID + '/' + panoID + '_' + tileX + '_' + tileY + '.jpg';
}

function getCustomPanorama(panoID) {
  //基本パノラマデータ定義
  var streetViewPanoramaData = {
    links: [],
    copyright: "(C) 2013 Created by hogehoge",		//著作者表示
    tiles: {
        tileSize: new google.maps.Size(512, 512), 		//各タイルサイズ
        worldSize: new google.maps.Size(4096, 2048), 	//全面サイズ(ﾀｲﾙｻｲｽﾞとｲｺｰﾙで一枚表示
        centerHeading: 0,				//初期方角
        getTileUrl: getCustomPanoramaTileUrl
    }
  }

  //各パノラマデータ登録
  switch(panoID) {
    case "pano_01":
	streetViewPanoramaData["location"] = {
	    pano: "pano_01",
	    description: "西パノラマ",
	    latLng: new google.maps.LatLng(36.552575, 139.870435)
	};
	break;
    case "pano_02":
	streetViewPanoramaData["location"] = {
	    pano: "pano_02",
	    description: "中央パノラマ",
	    latLng: new google.maps.LatLng(36.552325, 139.870465)
	};
	break;
    case "pano_03":
	streetViewPanoramaData["location"] = {
	    pano: "pano_03",
	    description: "北パノラマ",
	    latLng: new google.maps.LatLng(36.551927, 139.870502)
	};
	break;
  }

  return streetViewPanoramaData;
}

function createCustomLink() {
  var links = streetView.getLinks(); 		//現在のリンクの取得
  var panoID = streetView.getPano();		//現在のパノラマID取得

  switch(panoID) {
    case "pano_01":
	links.push({			//links.push([])は複数設置可
	    description : "中央",		//リンク表示名
	    pano : "pano_02",		//リンク先パノラマID
	    heading : 90,			//リンク方角
	});
	break;
    case "pano_02":
	links.push({			//links.push([])は複数設置可
	    description : "西",			//リンク表示名
	    pano : "pano_01",		//リンク先パノラマID
	    heading : 270,			//リンク方角
	});
	links.push({			//links.push([])は複数設置可
	    description : "北",			//リンク表示名
	    pano : "pano_03",		//リンク先パノラマID
	    heading : 0,			//リンク方角
	});
	break;
    case "pano_03":
	links.push({			//links.push([])は複数設置可
	    description : "中央",		//リンク表示名
	    pano : "pano_02",		//リンク先パノラマID
	    heading : 180,			//リンク方角
	});
	break;
  }
}

google.maps.event.addDomListener(window, 'load', initialize); //initializeを一度のみ実行
