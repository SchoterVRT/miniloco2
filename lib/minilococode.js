function miniloco(gameName,opgave,xtraText,xtraImage,taal){//taal 0 = NL, 1 = UK
	var imagePath="./mini-loco_images/"
	var marge = 10;
	var infoBreedte = 75;
	var lijnDikte = 2;
	var hoogteVak = 125;  //verticale hoogte van een vakje, hoogte 'a'
	var breedteVak = 125; //horizontale breedte van een vakje, breedte 'b'
	var nX = 6; //aantal vakjes horizontaal
	var nY = 2; //aanal vakjes verticaal
	var papierBreedte = nX*breedteVak+2*marge;
	var papierHoogte = 2*nY*hoogteVak+5*marge;
	var tekst1 =
		['\n\n\nSleep de bovenste vakjes naar het juiste vakje beneden.\n\nKijk na als je alle 12 vakjes een plek hebt gegeven.\n\nAls je het goed hebt gedaan, ontstaat een mooi patroon.\n\nDruk op "Reset" om het spel nog een keer te spelen.\n\n\n\nGemaakt door: Henk Reuling\n(o.a. voor de Wageningse Methode)\n\nNog meer miniloco-spelletjes vind je op:\nhttp://henkreuling.nl\n\nGepubliceerd onder Creative Commons Licentie\nCC BY-NC-SA',
		'\n\n\nDrag the upper tiles to the correct place in the lower grid.\n\nCheck your solution when you placed all 12 tiles.\n\nIf you made no mistakes, a regular pattern wil appear.\n\nPress "Reset" to play again.\n\n\n\nMade by: Henk Reuling\n(among other things for "de Wageningse Methode")\n\nMore miniloco-games:\nhttp://henkreuling.nl\n\nPublished under Creative Commons License\nCC BY-NC-SA'];
	var tekst2 =
		['\n\n\n\nJe kunt pas nakijken\nals je ALLE 12 vakjes\neen plaats beneden\nhebt gegeven\n!',
		'\n\n\n\nFirst give ALL 12 tiles\na place in the lower grid\n!'];
	var kijknaTekst = ['Kijk na','Check'];
	var terugTekst = ['terug', 'back'];
	var continueTekst = ['< terug', '< back'];
	var fouttekst = ['Nee,\nniet goed.','No,\nnot correct.'];
	var goedtekst = ['De code is: $€3,1415','De code is: $€3,1415'];
	var klaarTekst = ['Klaar! Druk op RESET om het nog een keer te spelen.','Finished! Press RESET to play again.'];
	var baseY = marge;
	var baseX = marge;
	var kleur= ["#003B79","#EAA35B","#B2B3FF"];//kleuren: zwart, oranje, blauw
	var doelBezet = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]; // welk nr ligt er? -1 als leeg
	var oplossing = [0,1,2,3,4,5,6,7,8,9,10,11];
	var start = [0,1,2,3,4,5,6,7,8,9,10,11];
	var basisPatroon=[[0,1,2,3], // patroon O
										[1,0,2,3], // patroon V
										[2,1,0,3], // patroon >
										[0,3,2,1], // patroon <
										[2,3,0,1], // patroon X
										[0,1,3,2]];// patroon V omgekeerd
	var kleurPatroon=[[0,4,8], //0 = rood, 2 = blauw, 4 = groen
										[0,8,4],
										[4,0,8],
										[4,8,0],
										[8,0,4],
										[8,4,0]];
	var check=false;

		// create a stage and a layer
		var stage = new Kinetic.Stage({
			container: "container",
			width: papierBreedte+2*marge+infoBreedte,
			height: papierHoogte+2*marge
		});

		var images = {};
		function loadImages(sources) {
			var loadedImages = 0;
			var numImages = 0;
			for(var src in sources) {
		  	numImages++;
			}
			for(var src in sources) {
				images[src] = new Image();
				images[src].onload = function() {
					if(++loadedImages >= numImages) {
						layer.draw();
					}
		  };
		  	images[src].src = 'images/' + sources[src];
			}
		}
		var sources = {
			wmlogo: 'wagmeth-header-logo.png',
			info_icon: 'info-icon.png',
			button_terug: 'button_oranje_terug_square.png',
			smiley_goed: 'Smiley_thumbsup.png',
			smiley_fout: 'smiley_vraagteken.png',
			vlaggen: 'NL_UK_flags.png',
			patroon0: imagePath+"patroon0.png",
			patroon1: imagePath+"patroon1.png",
			patroon2: imagePath+"patroon2.png",
			patroon3: imagePath+"patroon3.png",
			patroon4: imagePath+"patroon4.png",
			patroon5: imagePath+"patroon5.png",
			patroon6: imagePath+"patroon6.png",
			patroon7: imagePath+"patroon7.png",
			patroon8: imagePath+"patroon8.png",
			patroon9: imagePath+"patroon9.png",
			patroon10: imagePath+"patroon10.png",
			patroon11: imagePath+"patroon11.png",
			afb_0_0: imagePath+gameName+"_0_0.png",
			afb_0_1: imagePath+gameName+"_0_1.png",
			afb_1_0: imagePath+gameName+"_1_0.png",
			afb_1_1: imagePath+gameName+"_1_1.png",
			afb_2_0: imagePath+gameName+"_2_0.png",
			afb_2_1: imagePath+gameName+"_2_1.png",
			afb_3_0: imagePath+gameName+"_3_0.png",
			afb_3_1: imagePath+gameName+"_3_1.png",
			afb_4_0: imagePath+gameName+"_4_0.png",
			afb_4_1: imagePath+gameName+"_4_1.png",
			afb_5_0: imagePath+gameName+"_5_0.png",
			afb_5_1: imagePath+gameName+"_5_1.png",
			afb_6_0: imagePath+gameName+"_6_0.png",
			afb_6_1: imagePath+gameName+"_6_1.png",
			afb_7_0: imagePath+gameName+"_7_0.png",
			afb_7_1: imagePath+gameName+"_7_1.png",
			afb_8_0: imagePath+gameName+"_8_0.png",
			afb_8_1: imagePath+gameName+"_8_1.png",
			afb_9_0: imagePath+gameName+"_9_0.png",
			afb_9_1: imagePath+gameName+"_9_1.png",
			afb_10_0: imagePath+gameName+"_10_0.png",
			afb_10_1: imagePath+gameName+"_10_1.png",
			afb_11_0: imagePath+gameName+"_11_0.png",
			afb_11_1: imagePath+gameName+"_11_1.png"
		};
		if (xtraImage!=""){
			images['extra_image'] = new Image();
			images['extra_image'].onload = function() {layer.draw()};
	  	images['extra_image'].src = 'images/' + imagePath+xtraImage;
	  }
		loadImages(sources);

		var layer = new Kinetic.Layer();
		var layer2 = new Kinetic.Layer();
		stage.add(layer);
		stage.add(layer2);

		// an empty stage does not emit mouse-events
		// so fill the stage with a background rectangle
		// that can emit mouse-events
		var background = new Kinetic.Rect({
			x: 1, 
			y: 1, 
			width: stage.getWidth()-lijnDikte,
			height: papierHoogte-lijnDikte,
			stroke: "#003B79",
			strokeWidth: lijnDikte,
			fill: "#FDE2C4",
			id: "background"
		});
		layer.add(background);

		var logo = new Kinetic.Image({
			x: stage.getWidth()-infoBreedte-1.5*marge,
			y: papierHoogte-marge/2-90/133*infoBreedte,
			image: images['wmlogo'],
			width: infoBreedte,
			height: 90/133*infoBreedte,
			listening: false,
			id: "logo"
		});
		layer.add(logo);
		
		var infoButton = new Kinetic.Image({
			x: stage.getWidth()-infoBreedte/2-marge-25,
			y: papierHoogte-marge-110,
			image: images['info_icon'],
			width: 40,
			height: 40,
			id: "infoButton"
		});
		layer.add(infoButton);

		var vlagButton = new Kinetic.Image({
			x: stage.getWidth()-infoBreedte/2-marge-35,
			y: papierHoogte-marge-120-50,
			image: images['vlaggen'],
			width: 60,
			height: 23,
			id: "vlagButton"
		});
//		if (taal=1) vlagButton.setImage('english_flag');
		layer.add(vlagButton);

		var infoPanel=new Kinetic.Group({
			x: marge,
			y: marge
		});

		var infoTekst = new Kinetic.Text({
			x: 6*marge,
			y: 2*marge,
			width: stage.getWidth()-14*marge,
			text: tekst1[taal],
			lineHeight: 1.15,
			fontSize: 20,
			fontFamily: 'Arial',
			fill: '#003B79',
			padding: 10,
			align: 'center',
			listening: false
		});
		var infoRect = new Kinetic.Rect({
			x: 0, 
			y: 0, 
			width: stage.getWidth()-2*marge,
			height: 3*marge+4*hoogteVak,
			stroke: '#003B79',
			strokeWidth: 2,
			fill: '#B2B3CF',
			shadowColor: '#003B79',
			shadowBlur: 10,
			shadowOffset: [marge,marge],
			shadowOpacity: 0.65,
			cornerRadius: marge,
			id: "infoRect",
		});
		var terugButton = new Kinetic.Image({
			x: (stage.getWidth()-2*marge-80)/2,
			y: 50,
			image: images['button_terug'],
			width: 80,
			height: 30,
			id: "terugButton"
		});
		layer.add(infoButton);
		infoPanel.add(infoRect);
		infoPanel.add(infoTekst);
		infoPanel.add(terugButton);
		layer2.add(infoPanel);
		infoPanel.hide();

		infoButton.on("mousedown tap", function() {
			infoTekst.setText(tekst1[taal]);
			infoRect.show();
			infoTekst.show();
			infoPanel.show();
			layer2.draw();
		});
		terugButton.on("mousedown tap", function() {
			infoPanel.hide();
			layer2.draw();
		});
		vlagButton.on("mousedown tap", function() {
			if (taal==0) taal = 1 ; else taal = 0;
			if (check) {
				kijkNaTekst.setText(continueTekst[taal]);
				vraagTekst.setText(klaarTekst[taal]);
			}
			else {
				vraagTekst.setText(opgave[taal]);
				kijkNaTekst.setText(kijknaTekst[taal]);
			};
			extraTekst.setText(xtraText[taal]);
			goedTekst.setText(goedtekst[taal]);
			foutTekst.setText(fouttekst[taal]);
			layer.draw();
		});

		var goedTekst = new Kinetic.Text({
			x: stage.getWidth()-2*marge-infoBreedte,
			y: 90,
			width: infoBreedte+1*marge,
			text: goedtekst[taal],
			lineHeight: 1.25,
			fontSize: 18,
			fontFamily: 'Arial',
			fill: '#003B79',
			padding: 10,
			align: 'center',
			visible: false,
			listening: false
		});
		var foutTekst = new Kinetic.Text({
			x: stage.getWidth()-2.5*marge-infoBreedte,
			y: 90,
			width: infoBreedte+2*marge,
			text: fouttekst[taal],
			lineHeight: 1.25,
			fontSize: 20,
			fontFamily: 'Arial',
			fill: 'red',
			padding: 10,
			visible: false,
			align: 'center'
		});
		var goedSmiley = new Kinetic.Image({
			x: stage.getWidth()-2*marge-infoBreedte,
			y: 2*marge,
			image: images['smiley_goed'],
			width: infoBreedte,
			height: 150/165*infoBreedte,
			visible: false,
			listening: false,
			id: "goedSmiley"
		});
		var foutSmiley = new Kinetic.Image({
			x: stage.getWidth()-2*marge-infoBreedte,
			y: 2*marge,
			image: images['smiley_fout'],
			width: infoBreedte,
			height: infoBreedte,
			visible: false,
			listening: false,
			id: "foutSmiley"
		});
		layer.add(goedTekst);
		layer.add(foutTekst);
		layer.add(goedSmiley);
		layer.add(foutSmiley);

		if (xtraImage!=""){
			var extraImage = new Kinetic.Image({
				x: stage.getWidth()-2.6*marge-infoBreedte,
				y: marge,
				image: images['extra_image'],
				width: infoBreedte+2*marge,
				height: 2*(infoBreedte+2*marge),
				visible: true,
				listening: false,
				id: "extraImage"
			});
			layer.add(extraImage);
		};

		var extraTekst = new Kinetic.Text({
			x: stage.getWidth()-3*marge-infoBreedte,
			y: 6*marge,
			width: infoBreedte+3*marge,
			text: xtraText[taal],
			lineHeight: 1.15,
			fontSize: 18,
			fontFamily: 'Arial',
			fill: '#003B79',
			padding: 10,
			align: 'center',
			listening: false
		});
		layer.add(extraTekst);

		var kijkNaButton = new Kinetic.Group({
			x: stage.getWidth()-2*marge-infoBreedte,
			y: 260
		});
		var kijkNaTekst = new Kinetic.Text({
			x: marge,
			y: marge/2,
			text: kijknaTekst[taal],
			fontSize: 20,
			fontStyle: 'bold',
			fontFamily: 'Arial',
			fill: '#003B79',
			padding: 0,
			align: 'center'
		});
		var buttonRect = new Kinetic.Rect({
			x: 0, 
			y: 0, 
			width: kijkNaTekst.getWidth()+2*marge,
			height: kijkNaTekst.getHeight()+marge,
			stroke: '#003B79',
			strokeWidth: 2,
			fill: '#B2B3CF',
			shadowColor: '#003B79',
			shadowBlur: 10,
			shadowOffset: [6,6],
			shadowOpacity: 0.65,
			cornerRadius: 6,
			id: "buttonRect"
		});
		kijkNaButton.add(buttonRect);
		kijkNaButton.add(kijkNaTekst);
		layer.add(kijkNaButton);

		kijkNaButton.on("mousedown tap", function() {
			if (check){ //ga terug, verder met de opgave
				kijkNaTekst.setText(kijknaTekst[taal]); 
				vraagTekst.setText(opgave[taal]);
				goedSmiley.hide();
				foutSmiley.hide();
				goedTekst.hide();
				foutTekst.hide();
				check=false;
				var shapes = stage.find('Image');
				for (i=0; i<shapes.length;i++){
					if (shapes[i].getId().indexOf('bron')>=0){
						shapes[i].setImage(images['afb_'+start[parseInt(shapes[i].getId().substr(4,2))]+'_0']);
						shapes[i].setDraggable(true);
					};
				}
				if (xtraImage!=""){extraImage.show();}
				extraTekst.show();
				layer.draw();
			}
			else { //kijk na of het goed is
				if (!allesGeplaatst()){
					infoTekst.setText(tekst2[taal]);
					infoRect.show();
					infoTekst.show();
					infoPanel.show();
					layer2.draw();
				}
				else {
					if (xtraImage!=""){extraImage.hide();}
					extraTekst.hide();
					if (checkFinish()){//GOED
						check=true;
						kijkNaTekst.setText(continueTekst[taal]);
						vraagTekst.setText(klaarTekst[taal]);
						goedTekst.show();
						foutTekst.hide();
						goedSmiley.show();
						foutSmiley.hide();
						layer.draw();
					}
					else {//FOUT
						check=true;
						kijkNaTekst.setText(continueTekst[taal]);
						goedTekst.hide();
						foutTekst.show();
						goedSmiley.hide();
						foutSmiley.show();
						infoPanel.show();
						layer.draw();
					}
				}
			}
		});
		kijkNaButton.on("mouseover", function() {
			document.body.style.cursor = "pointer";
		});
		kijkNaButton.on("mouseout", function() {
			document.body.style.cursor = "default";
		});
		
		function checkFinish(){
			check=true;
			var shapes = stage.find('Image');
			for (i=0; i<shapes.length;i++){
				if (shapes[i].getId().indexOf('bron')>=0){
					shapes[i].setImage(images['patroon'+shapes[i].vraagNr]);
					shapes[i].setDraggable(false);
				};
			};
			layer.draw();
			var goed = true;
			for (var i=0; i<nX*nY; i++){
				goed = goed && (oplossing[i]==doelBezet[i]);
			};
			return goed
		}; 

		var clearButton = new Kinetic.Group({
			x: 1*marge+stage.getWidth()-2*marge-infoBreedte,
			y: 315
		});
		var clearTekst = new Kinetic.Text({
			x: marge,
			y: marge/2,
			text: 'reset',
			fontSize: 20,
			fontStyle: 'bold',
			fontFamily: 'Arial',
			fill: '#003B79',
			padding: 0,
			align: 'center'
		});
		var clearRect = new Kinetic.Rect({
			x: 0, 
			y: 0, 
			width: clearTekst.getWidth()+2*marge,
			height: clearTekst.getHeight()+marge,
			stroke: '#003B79',
			strokeWidth: 2,
			fill: '#B2B3CF',
			shadowColor: '#003B79',
			shadowBlur: 10,
			shadowOffset: [6,6],
			shadowOpacity: 0.65,
			cornerRadius: 6,
			id: "buttonRect"
		});
		clearButton.add(clearRect);
		clearButton.add(clearTekst);
		layer.add(clearButton);

		clearButton.on("mousedown tap", function() {
			location.reload();
		});
		clearButton.on("mouseover", function() {
			document.body.style.cursor = "pointer";
		});
		clearButton.on("mouseout", function() {
			document.body.style.cursor = "default";
		});

		var playground = new Kinetic.Group({
			x: 0,
			y: 0
		});

		for(var i=0;i<=nX;i++){
			var ver_roosterlijn = new Kinetic.Line({
				points: [baseX+i*breedteVak,baseY,baseX+i*breedteVak,baseY+nY*hoogteVak],
				stroke: kleur[0],
				strokeWidth: lijnDikte,
				lineCap: 'round',
				listening: false,
				id: 'bronrooster'
			});
			playground.add(ver_roosterlijn);
		};
		for(var i=0;i<=nY;i++){
			var hor_roosterlijn = new Kinetic.Line({
				points: [baseX,baseY+i*hoogteVak,baseX+nX*breedteVak,baseY+i*hoogteVak],
				stroke: kleur[0],
				strokeWidth: lijnDikte,
				lineCap: 'round',
				listening: false,
				id: 'bronrooster'
			});
			playground.add(hor_roosterlijn);
		}
		for(var i=0;i<=nX;i++){
			var ver_roosterlijn = new Kinetic.Line({
				points: [baseX+i*breedteVak,baseY+3*marge+2*hoogteVak,baseX+i*breedteVak,baseY+3*marge+(nY+2)*hoogteVak],
				stroke: kleur[0],
				strokeWidth: lijnDikte,
				lineCap: 'round',
				listening: false,
				id: 'doelrooster'
			});
			playground.add(ver_roosterlijn);
		};
		for(var i=0;i<=nY;i++){
			var hor_roosterlijn = new Kinetic.Line({
				points: [baseX,baseY+3*marge+(i+2)*hoogteVak,baseX+nX*breedteVak,baseY+3*marge+(i+2)*hoogteVak],
				stroke: kleur[0],
				strokeWidth: lijnDikte,
				lineCap: 'round',
				listening: false,
				id: 'doelrooster'
			});
			playground.add(hor_roosterlijn);
		}

		var vraagTekst = new Kinetic.Text({
			x: 1*marge,
			y: nY*hoogteVak+0.5*marge,
			width: papierBreedte-marge,
			text: opgave[taal],
			lineHeight: 1.15,
			fontSize: 20,
			fontFamily: 'Arial',
			fontStyle: 'bold',
			fill: kleur[0],
			padding: 10,
			align: 'left',
			listening: false
		});
		playground.add(vraagTekst);

		for(var x=0;x<nX;x++){//doel-afbeeldingen: achtergrond eventueel transparant
			for(var y=0;y<nY;y++){
				var hulp = y*6+x;
				var doel = new Kinetic.Image({
					x: baseX+x*breedteVak+lijnDikte/2,
					y: baseY+3*marge+(y+2)*hoogteVak+lijnDikte/2,
					image: images['afb_'+hulp+'_1'],
					listening: false,
					width: breedteVak-lijnDikte,
					height: hoogteVak-lijnDikte,
					id: "doel"+hulp,
					vraagNr: -1
				});
				playground.add(doel);
			}
		}

		for(var x=0;x<nX;x++){//bron-afbeeldingen: achtergrond ondoorschijnend
			for(var y=0;y<nY;y++){
				// anonymous function to induce scope
				(function() {  //create and draw image
					var hulp = y*6+x;
					var blokje = new Kinetic.Image({
						x: baseX+x*breedteVak+lijnDikte/2,
						y: baseY+y*hoogteVak+lijnDikte/2,
						image: images['afb_'+hulp+'_0'],
						id: "bron"+hulp,
						width: breedteVak-lijnDikte,
						height: hoogteVak-lijnDikte,
						draggable: true,
						stroke:kleur[0],
						strokeWidth:lijnDikte,
						vraagNr: -1,
						dragBoundFunc: function (pos) {
							var X = pos.x;
							var Y = pos.y;
							if (X > (nX-1)*breedteVak+1*marge) X = (nX-1)*breedteVak+1*marge+lijnDikte/2;
							if (Y > (2*nY-1)*hoogteVak+4*marge) Y = (2*nY-1)*hoogteVak+4*marge+lijnDikte/2;
							if (X < marge) X = marge+lijnDikte/2;
							if (Y < marge) Y = marge+lijnDikte/2;
							return ({
								x: X,
								y: Y
							});
						}
					});
					playground.add(blokje);
					blokje.on("mouseover", function() {
						document.body.style.cursor = "move";
					});
					blokje.on("mouseout", function() {
						document.body.style.cursor = "default";
					});
					blokje.on("dragstart", function(){
						if (!check){
							blokje.moveToTop();
							if (doelBezet.indexOf(this.vraagNr)>=0) doelBezet[doelBezet.indexOf(this.vraagNr)]=-1;
							layer.draw();
						}
					});
					blokje.on("dragend", function(){
						var plaatsNummer = parseInt(this.getId().substr(4,2));
						var X = this.getX();
						var Y = this.getY();
						if (Y<=marge+2*hoogteVak){//losgelaten in bovenste deel
							X = marge+plaatsNummer%6*breedteVak+lijnDikte/2;
							Y = ~~(plaatsNummer/6)*hoogteVak+marge+lijnDikte/2;
							if (doelBezet.indexOf(this.vraagNr)>=0) doelBezet[doelBezet.indexOf(this.vraagNr)]=-1;
							this.setStroke(kleur[0]);
							this.setStrokeWidth(lijnDikte);
							this.setWidth(breedteVak-lijnDikte);
							this.setHeight(hoogteVak-lijnDikte);
						}
						else {
							var leeg = [];
							for (var i=0; i<nX*nY; i++){
								if (doelBezet[i]<0) leeg.push(i);
							};
							var kleinste = 0;
							for (var i=1; i<leeg.length; i++){
								if (afstand(X,Y,(leeg[i]%6)*breedteVak,(~~(leeg[i]/6)+2)*hoogteVak+4*marge)
								    <afstand(X,Y,marge+(leeg[kleinste]%6)*breedteVak,(~~(leeg[kleinste]/6)+2)*hoogteVak+4*marge))
									kleinste = i;
							};
							if (afstand(X,Y,marge+(leeg[kleinste]%6)*breedteVak,(~~(leeg[kleinste]/6)+2)*hoogteVak+4*marge)<breedteVak/2){
								//check of dicht genoeg bij een lege plek beneden
								doelBezet[leeg[kleinste]] = this.vraagNr;
								X = marge+(leeg[kleinste]%6)*breedteVak+lijnDikte/2;
								Y = (~~(leeg[kleinste]/6)+2)*hoogteVak+4*marge+lijnDikte/2;
							}
							else {//te ver van een lege plek, dus terug naar bovenste deel
								if (doelBezet.indexOf(this.vraagNr)>=0) doelBezet[doelBezet.indexOf(this.vraagNr)]=-1;
								X = marge+plaatsNummer%6*breedteVak+lijnDikte/2;
								Y = ~~(plaatsNummer/6)*hoogteVak+marge+lijnDikte/2;
								this.setStroke(kleur[0]);	
								this.setStrokeWidth(lijnDikte);
								this.setWidth(breedteVak-lijnDikte);
								this.setHeight(hoogteVak-lijnDikte);
							}
						};
						this.setX(X);
						this.setY(Y);
						layer.draw();
					});
				})();
			}
		}

		function afstand(xx1,yy1,xx2,yy2){
			var dist;
			dist = Math.sqrt((xx1-xx2)*(xx1-xx2)+(yy1-yy2)*(yy1-yy2));
			return dist;	
		}

		function shuffle(array) {
		  var m = array.length, t, i;
			// While there remain elements to shuffle�
			while (m) {
				// Pick a remaining element�
				i = Math.floor(Math.random() * m--);
				// And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			return array;
		}

		function allesGeplaatst() {
		  var allemaal = true;
			for (var i=0; i<nX*nY; i++) {
				allemaal = (allemaal && doelBezet[i]>=0);
			}
			return allemaal;
		}

		function zetKlaar() {
			var shapes = stage.find('Image');
			var nummer, idee;
			for (i=0; i<shapes.length;i++){
				idee = shapes[i].getId();
				if (idee.indexOf('doel')>=0){
					nummer = parseInt(idee.substr(4,2));
					shapes[i].setImage(images['afb_'+oplossing[nummer]+'_1']);
					doelBezet[nummer]=-1;
					shapes[i].vraagNr=oplossing[nummer];
				}
				else if (idee.indexOf('bron')>=0){
					nummer = parseInt(idee.substr(4,2));
					shapes[i].setImage(images['afb_'+start[nummer]+'_0']);
					shapes[i].vraagNr=start[nummer];
				};
			}
		}
		
		function maakOplossing(oplossing){
			var figuur = Math.floor(Math.random() * basisPatroon.length);
			var kleurVolgorde = Math.floor(Math.random() * 6);
			for (var i=0; i<3; i++){
					oplossing[i*2+0]=basisPatroon[figuur][0] + kleurPatroon[kleurVolgorde][i];
					oplossing[i*2+1]=basisPatroon[figuur][1] + kleurPatroon[kleurVolgorde][i];
					oplossing[i*2+6]=basisPatroon[figuur][2] + kleurPatroon[kleurVolgorde][i];
					oplossing[i*2+7]=basisPatroon[figuur][3] + kleurPatroon[kleurVolgorde][i];
			};
		}
		
		layer.add(playground);
		maakOplossing(oplossing);
		shuffle(start);
		zetKlaar();
		layer.draw();
		layer2.draw();
}