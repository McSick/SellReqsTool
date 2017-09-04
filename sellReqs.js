toProperCase = function (str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

Halo5Requisitions.Helpers.sellAllBut = function (choice, keeporsell) {
	var allReqs = $('.card');
	var reqsToSell = [];
	var total = 0;
	var left2sell = 0;
	if (choice === 'keep') {
		var reqsToSellDom = shownReqs.filter(function () {
				var reqElement = $(this).find('button').eq(0);
				var req = Halo5Requisitions.Helpers.buildReq(reqElement);
				var canSell = req.haveOwned && !req.isWearable && (req.unusedCount > keeporsell);
				if (canSell) {
					reqsToSell.push(req);
					total += req.sellPrice * (req.unusedCount - keeporsell);
					left2sell +=  (req.unusedCount - keeporsell);
				}
				return canSell;
			});

	} else {
		var reqsToSellDom = shownReqs.filter(function () {
				var reqElement = $(this).find('button').eq(0);
				var req = Halo5Requisitions.Helpers.buildReq(reqElement);
				var canSell = req.haveOwned && !req.isWearable && (req.unusedCount > 0);
				if (canSell) {
					reqsToSell.push(req);
					total += req.sellPrice * (req.unusedCount > keeporsell ? keeporsell : req.unusedCount);
					left2sell +=  (req.unusedCount > keeporsell ? keeporsell : req.unusedCount);
				}
				return canSell;
			});
	}

	return {
		reqs : reqsToSell,
		worth : total,
		left2sell:left2sell
	};

}

var defaultBoolean = function (a) {
	if (typeof(a) === "undefined") {
		return false;
	} else {
		return a.toLowerCase() === "true"
	}
};
Halo5Requisitions.Helpers.buildReq = function (reqElement) {

	return {
		id : reqElement.attr("data-id"),
		name : reqElement.attr("data-name"),
		description : reqElement.attr("data-description"),
		image : reqElement.find("img").data("src"),
		sellPrice : parseInt(reqElement.attr("data-sell-price"), 10),
		isWearable : defaultBoolean(reqElement.attr("data-is-wearable")),
		wearableId : reqElement.attr("data-wearable-id"),
		subcategory : reqElement.attr("data-subcategory"),
		haveOwned : defaultBoolean(reqElement.attr("data-have-owned")),
		unusedCount : parseInt(reqElement.attr("data-unused-count")),
		hasCertification : defaultBoolean(reqElement.attr("data-has-certification")),
		isDurable : defaultBoolean(reqElement.attr("data-is-durable")),
		sellUrl : $(".halo5-reqs.req-collection").attr("data-sellurl"),
		rarity : reqElement.attr("data-rarity"),
		rarityType : reqElement.attr("data-rarity-type"),
		energyLevel : reqElement.attr("data-energy-level")
	};
}
var filterTemplate = '<div class="region"><div class="content"><button class="button" id="showadvanced" onClick="toggleHWT()" >Toggle Advanced Filtering/Selling</button></div></div><div class="region hwtextra" ><div class="content" id="topArea"><h2 class="text--larger category-name">Advanced Filter</h2><hr><p class="text--smallest">Select Options to Filter On</p><div class="grid"><div  class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Name Contains</label></header></div></div></div><div class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="req-name" name="req-name" value=""></li></ul></div></div></div><div  class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Category</label></header></div></div></div><div class="row row-6" id="cat1row"></div><div class="row row-6" id="cat2row"></div><div class="row row-6" id="cat3row"></div><div  class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Rarity</label></header></div></div></div><div class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="rarity-common" name="rarity-common" type="checkbox" value=""><label for="rarity-common">Common</label></li></ul></div></div><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="rarity-uncommon" name="rarity-uncommon" type="checkbox" value=""><label for="rarity-uncommon">Uncommon</label></li></ul></div></div><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="rarity-rare" name="rarity-rare" type="checkbox" value=""><label for="rarity-rare">Rare</label></li></ul></div></div></div><div class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="rarity-ultrarare" name="rarity-ultrarare" type="checkbox" value=""  ><label for="rarity-ultrarare">Ultra Rare</label></li></ul></div></div><div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert" ><li><input id="rarity-legendary" name="rarity-legendary" type="checkbox" value=""><label for="rarity-legendary">Legendary</label></li></ul></div></div></div><div  class="row row-6 energylevelarea"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Req Energy Level</label></header></div></div></div><div class="row row-6 energylevelarea"><div class="col req-col"><div class="input-field" data-type="normal">Lower <input  id="energy-min" type="number" value="0"/></div></div><div class="col req-col"><div class="input-field" data-type="normal">Upper	<input  id="energy-max" type="number" value="9"/></div></div></div><div  class="row row-6 sellable"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Price</label></header></div></div></div><div class="row row-6 sellable"><div class="col req-col"><div class="input-field" data-type="normal">Lower <input  id="price-min" type="number" value="0"/></div></div><div class="col req-col"><div class="input-field" data-type="normal">Upper	<input  id="price-max" type="number" value="1000"/></div></div></div><div  class="row row-6 sellable"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Unused Amount</label></header></div></div></div><div class="row row-6 sellable"><div class="col req-col"><div class="input-field" data-type="normal">Lower <input  id="unused-min" type="number" value="0"/></div></div><div class="col req-col"><div class="input-field" data-type="normal">Upper	<input  id="unused-max" type="number" value="1000"/></div></div></div><div class="row row-6"><div class="col req-col"><div class="input-field" data-type="normal"><header><label >Have Owned</label></header><ul class="input-group-vert" ><li><input id="owned" name="owned" type="checkbox" value=""><label for="owned">Yes</label></li><li><input id="notowned" name="notowned" type="checkbox" value="" ><label for="notowned">No</label></li></ul></div></div><div class="col req-col "><div class="input-field" data-type="normal"><header><label >Wearable</label></header><ul class="input-group-vert" ><li><input id="wearable" name="wearable" type="checkbox" value=""><label for="wearable">Yes</label></li><li><input id="notwearable" name="notwearable" type="checkbox" value="" ><label for="notwearable" >No</label></li></ul></div></div><div class="col req-col sellable"><div class="input-field sellable" data-type="normal"><header><label >Has Certification</label></header><ul class="input-group-vert" ><li><input id="certified" name="certified" type="checkbox" value=""><label for="certified">Yes</label></li><li><input id="notcertified" name="notcertified" type="checkbox" value="" ><label for="notcertified">No</label></li></ul></div></div></div><div  class="row row-6"><div class="col req-col" style="margin-top:10px;"><button class="button" id="applyfilter" onClick="applyFilterFunc()"  >Apply Filter</button></div></div></div></div></div><div class="region hwtextra sellable"  ><div class="content"><h2 class="text--larger category-name">Mass Sell</h2><hr><p class="text--smallest">Sell filtered reqs all at once </p><div class="grid"><div  class="row row-6"><div class="col req-col"><select data-val="true" id="sellChoice"><option selected="selected" value="keep">Keep</option><option value="sell">Sell</option></select></div><div class="col req-col"><div class="input-field" data-type="normal" ><input  id="keeporsell" type="number" value="10"/></div></div><div class="col req-col"><button class="button" id="sellall" onClick="confirmSellAll()">Go</button></div></div></div></div></div><div class="region hwtextra"><div class="content" id="allreqscontent"><div class="req-category"><div class="reqs-row show always-show"><div class="grid" id="allReqs"></div></div></div></div></div></div >';

var reqBalance = $('.credit-balance');

var originalReqs = $('.card');
var HWTTOGGLE = true;
var toggleHWT = function () {

	if (HWTTOGGLE) {
		$('.hwtextra').css('display', '');
		originalRegions.css('display', 'none');

		applyFilterFunc();
	} else {
		$('.hwtextra').css('display', 'none');
		originalRegions.css('display', '');
		originalReqs.show();

	}

	if (HWTTOGGLE && !defaultBoolean(originalReqs.eq(0).find('button').eq(0).attr("data-is-durable"))) {
		$('.sellable').css('display', '');
	} else {
		$('.sellable').css('display', 'none');
	}

	if (defaultBoolean(originalReqs.eq(0).find('button').eq(0).attr("data-is-wearable"))) {
		$('.energylevelarea').css('display', 'none');
	}

	HWTTOGGLE = !HWTTOGGLE;

}
var originalRegions = $('.region');
var buildFilterOptions = function () {
	originalReqs.filter(function () {
		var reqElement = $(this).find('button').eq(0);
		if (reqElement.attr("data-subcategory") === "") {
			reqElement.attr("data-subcategory", reqElement.parents('.region').find('.content').find('h2').html().split('(')[0].trim())
		}
		var req = Halo5Requisitions.Helpers.buildReq(reqElement);
		var key = req.subcategory;
		if (subcategorymap.hasOwnProperty(key)) {
			subcategorymap[key].shown++;
			subcategorymap[key].total++;

		} else {
			subcategorymap[key] = {
				text : key,
				shown : 1,
				total : 1
			}

		}
	});
	var categoryPrinted = 0;
	var sellableCount = 0;
	for (var subcategory in subcategorymap) {
		if (subcategorymap[subcategory].total > 0) {
			if (["PowerWeapon", "Vehicle", "Equipment", "Arena", "Warzone"].indexOf(subcategory) >= 0) {
				canSell = true;
			}
			var row;
			if (categoryPrinted < 3) {
				row = $('#cat1row');
			} else if (categoryPrinted < 5) {
				row = $('#cat2row');
			} else {
				row = $('#cat3row');
			}
			var inputFilterHTML = '<div class="col req-col"><div class="input-field" data-type="normal"><ul class="input-group-vert"  role="group"><li><input id="subcategory-' + subcategory + '" class="subcategoryCheckbox" data-subcategory="' + subcategory + '" name="subcategory-' + subcategory + '" type="checkbox" value=""><label for="subcategory-' + subcategory + '">' + toProperCase(subcategorymap[subcategory].text) + '</label></li></ul></div></div>';
			row.append(inputFilterHTML);
			categoryPrinted++;
		}

	}

};

var init = function () {

	$('#allreqscontent').prepend(reqBalance);
	if ($('.gamertag').html() !== 'Sign In') {

		$(".halo5-reqs.req-collection").prepend($(filterTemplate));
		buildFilterOptions();
		$('input:checkbox').trigger('click');
		$('.hwtextra').css('display', 'none');
		$('#topArea').prepend($('.credit-balance').clone(true));

	}

}
var canSell = false;

var buildRow = function (parent) {
	var row = $('<div  class="row row-6"></div>')
		parent.append(row);
	return row;
}
var buildCol = function (req) {
	var col = $('<div class="col req-col"></div>');
	col.append(req);
	return col;

}
var buildReqs = function (parent, reqs) {
	var row;
	parent.empty();
	var j = 0;
	var subcategory = '';
	var categoryele;
	var reqcount = 0;
	var countele;
	for (var i = 0; i < reqs.length; i++) {
		var newSubCategory = $(reqs[i]).find('button').eq(0).attr("data-subcategory");
		//newSubCategory = newSubCategory === "" ? $(reqs[i]).parents('.region').find('.content').find('h2').html().split('(')[0].trim() :newSubCategory;
		if (subcategory !== newSubCategory) {
			j = 0;
			if (categoryele) {
				categoryele.append('<hr>');
			}
			categoryele = $('<h2 class="text--larger category-name" id="' + newSubCategory + '-count">');
			categoryele.prepend(countele);
			reqcount = 0;
			parent.append(categoryele);
			subcategory = newSubCategory;
		}
		reqcount++;
		categoryele.html(newSubCategory + ' (' + reqcount + ')');
		if (j === 0) {
			row = buildRow(parent);
		}
		row.append(buildCol(reqs[i]));
		j = j > 4 ? 0 : (j + 1);
	}
	categoryele.append('<hr>');

}

var subcategorymap = {
	"PowerWeapon" : {
		text : "Power Weapon",
		shown : 0,
		total : 0
	},
	"Vehicle" : {
		text : "Vehicle",
		shown : 0,
		total : 0
	},
	"Equipment" : {
		text : "Equipment",
		shown : 0,
		total : 0
	},
	"Arena" : {
		text : "Arena",
		shown : 0,
		total : 0
	},
	"Warzone" : {
		text : "Warzone",
		shown : 0,
		total : 0
	},
	"ArmorSuit" : {
		text : "Armor",
		shown : 0,
		total : 0
	},
	"Visor" : {
		text : "Visor",
		shown : 0,
		total : 0
	},
	"Emblem" : {
		text : "Emblem",
		shown : 0,
		total : 0
	},
	"Stance" : {
		text : "Stance",
		shown : 0,
		total : 0
	},
	"Assassination" : {
		text : "Assassination",
		shown : 0,
		total : 0
	},
	"WeaponSkin" : {
		text : "Weapon Skin",
		shown : 0,
		total : 0
	},
	"Weapon" : {
		text : "Weapon",
		shown : 0,
		total : 0
	},

}

var shownReqs;
var applyFilterFunc = function () {
	var allReqs = originalReqs.clone(true);

	var filterObject = {
		price : {
			min : parseInt($('#price-min').val()),
			max : parseInt($('#price-max').val())
		},
		energylevel : {
			min : parseInt($('#energy-min').val()),
			max : parseInt($('#energy-max').val())
		},
		unused : {
			min : parseInt($('#unused-min').val()),
			max : parseInt($('#unused-max').val())
		},
		rarity : {
			Common : $('#rarity-common').is(":checked"),
			Uncommon : $('#rarity-uncommon').is(":checked"),
			Rare : $('#rarity-rare').is(":checked"),
			"Ultra Rare" : $('#rarity-ultrarare').is(":checked"),
			Legendary : $('#rarity-legendary').is(":checked")

		},
		wearable : {
			yes : $('#wearable').is(":checked"),
			no : $('#notwearable').is(":checked")
		},
		owned : {
			yes : $('#owned').is(":checked"),
			no : $('#notowned').is(":checked")
		},
		certification : {
			yes : $('#certified').is(":checked"),
			no : $('#notcertified').is(":checked")
		},
		durable : {
			yes : $('#durable').is(":checked"),
			no : $('#notdurable').is(":checked")
		},
		name: $('#req-name').val().toLowerCase()
	};
	var rarityArray = [];
	for (key in filterObject.rarity) {
		if (filterObject.rarity[key]) {
			rarityArray.push(key);
		}
	}
	var subcategoryChecks = $('.subcategoryCheckbox');
	var subcategoryFilter = {};
	subcategoryChecks.each(function (index, checkbox) {
		var cat = $(checkbox).attr('data-subcategory');
		var show = $(checkbox).is(":checked");
		subcategoryFilter[cat] = show;

	});


	var reqsToShow = allReqs.filter(function () {
			var reqElement = $(this).find('button').eq(0);
			var req = Halo5Requisitions.Helpers.buildReq(reqElement);
			var validName = true;
			if(filterObject.name.length > 0 && !(req.name.toLowerCase().indexOf(filterObject.name) >= 0)){
				validName = false;
			}
			var validRarity = false;
			if (rarityArray.indexOf(req.rarity) >= 0) {
				validRarity = true;
			}

			var validPrice = false;
			if ((filterObject.price.min <= req.sellPrice && req.sellPrice <= filterObject.price.max) || req.isWearable) {
				validPrice = true;
			}

			var validEnergyLevel = false;
			if ((filterObject.energylevel.min <= req.energyLevel && req.energyLevel <= filterObject.energylevel.max) || req.isWearable) {
				validEnergyLevel = true;
			}

			var validUnused = false;
			if ((filterObject.unused.min <= req.unusedCount && req.unusedCount <= filterObject.unused.max) || req.isWearable) {
				validUnused = true;
			}

			var validSubCategory = false;
			var subcategory = req.subcategory; // === "" ? reqElement.parents('.region').find('.content').find('h2').html().split('(')[0].trim() : req.subcategory;
			if (subcategoryFilter.hasOwnProperty(subcategory)) {
				validSubCategory = subcategoryFilter[subcategory];
			}

			var validWearable = false;
			if ((req.isWearable && filterObject.wearable.yes) || (!req.isWearable && filterObject.wearable.no)) {
				validWearable = true;
			}
			var validOwned = false;
			if ((req.haveOwned && filterObject.owned.yes) || (!req.haveOwned && filterObject.owned.no)) {
				validOwned = true;
			}
			var validCert = false;
			if ((req.hasCertification && filterObject.certification.yes) || (!req.hasCertification && filterObject.certification.no)) {
				validCert = true;
			}

			return validRarity && validPrice && validEnergyLevel && validSubCategory && validWearable && validCert && validOwned && validUnused && validName;
		});
	shownReqs = reqsToShow.clone(true);

	buildReqs($('#allReqs'), reqsToShow);
	$( window ).scrollTop( $( window ).scrollTop() + 1 );
}

init();

var confirmSellAll = function () {

	var keeporsell = parseInt($('#keeporsell').val());
	if (isNaN(keeporsell) && keeporsell > 0) {
		alert('Please Enter a Valid Number');
		return;
	}
	var choice = $('#sellChoice').val();
	var title = '';
	var content = ''
		if (choice === 'sell') {
			title = 'Sell {0} Reqs';
			content = 'Are you sure you want to sell <strong>{0}</strong> of each shown req?<br>This will give you <strong>{1}</strong> req points.<br>Left to Sell:<strong><label id="left2sell"></label></strong>';
		} else {
			title = 'Keep {0} Reqs';
			content = 'Are you sure you want to sell each shown req down to <strong>{0}</strong>?<Br>This will give you <strong>{1}</strong> req points.<br>Left to Sell:<strong><label id="left2sell"></label></strong>';
		}
		var sellObject = Halo5Requisitions.Helpers.sellAllBut(choice, keeporsell);
	var reqs = sellObject.reqs;
	var n = reqs[0];

	var t = new Utilities.Dialog({
			title : title.replace("{0}", keeporsell),
			content : content.replace("{0}", keeporsell).replace("{1}", sellObject.worth),
			buttons : [{
					text : Halo.Resources.Strings.yes,
					handler : function (u) {

						var getReq = function (u) {
							n = reqs.pop();
							var r = $('<div class="card"><img class="' + (n.haveOwned ? "" : "locked") + '" src="' + n.image + '" alt="" />' + (n.isDurable ? "" : '<div class="text--small card-count">' + Halo.Resources.Strings.x_count.replace("{0}", n.unusedCount) + "<\/div>") + '<\/div><div class="info"><div class="text--large title">' + n.name + "<\/div>" + (Utilities.Is.NullUndefinedOrWhiteSpace(n.rarity) ? "" : '<div class="energy-rarity">' + (n.energyLevel > 0 ? '<div class="energy-level energy-' + n.energyLevel + '"><\/div>' : "") + '<div class="text--small rarity rarity-' + n.rarityType + '">' + n.rarity + "<\/div><\/div>") + (n.hasCertification ? '<img class="cert" src="' + Halo.Resources.Uris.halo5ReqCertificationIconUri + '" />' : "") + "<p>" + (Utilities.Is.NullOrUndefined(n.description) ? "" : n.description) + "<\/p><\/div>"),
							e = $(r[1]),
							i,
							o,
							u,
							f;
							if (n.sellPrice > 0 && n.unusedCount > 0 && n.sellUrl) {
								i = $('<div class="sell-info"><\/div>');
								o = $('<img class="credit-icon" src="' + Halo.Resources.Uris.halo5CreditBalanceIconUri + '" /><div class="numeric--medium">' + n.sellPrice + '<\/div><div class="text--smallest">' + Halo.Resources.Strings.req_points + "<\/div>");
								i.append(o);
								i.hide();
								o.hide();

								var sellThis = function (u, count, original) {
									count--;
									$('#left2sell').html(sellObject.left2sell--);

									var f = new Utilities.Ajax(n.sellUrl, "POST");
									f.dataBody = {
										RequisitionId : n.id,
										ExpectedSellPrice : n.sellPrice
									};
									f.successFunc = function (f) {

										if (count) {
											sellThis(u, count, original);
										} else {
											$('#haloReqSeller-NumPicker-' + n.id).attr('max', parseInt($('#haloReqSeller-NumPicker-' + n.id).attr('max')) - original);
											var e = $('.halo5-reqs.req-collection .card button[data-id="' + n.id + '"]'),
											c = r.find(".card-count").add(e.siblings(".card-count")),
											o,
											s,
											h;
											var checkFinish = function () {
												o = $(".halo5-reqs .credit-balance .value"),
												o.text(parseInt(o.text(), 10) + parseInt(f.SoldPrice, 10) * original)
												n.unusedCount -= original
												n.unusedCount <= 0 && i.hide()
												c.text(Halo.Resources.Strings.x_count.replace("{0}", n.unusedCount))
												e.attr("data-unused-count", n.unusedCount),
												e.length === 0 && (s = $(".opened-pack .req.selected"), h = $('.opened-pack .req[data-id="' + n.id + '"]'), s.length !== 0 ? s.remove() : h.first().remove(), h.attr("data-unused-count", n.unusedCount))
												if (reqs.length) {
													getReq(u);
												} else {
													Halo.UI.InputControls.Button.showSuccess($(u.delegateTarget), function () {
														t.hide();
														$('#topArea').prepend($('.credit-balance').clone(true));
														applyFilterFunc();
													});
												}

											}
											f.State === 4 ? (new Utilities.Dialog({
													content : Halo.Resources.Strings.no_cards_left_to_sell,
													buttons : [{
															text : Halo.Resources.Strings.action_ok,
															action : 0
														}
													],
													size : 1
												}).show(), t.hide(), i.hide(), c.text(Halo.Resources.Strings.x_count.replace("{0}", "0")), e.attr("data-unused-count", "0"), e.length === 0 && $('.opened-pack .req[data-id="' + n.id + '"]').remove()) : checkFinish()

										}
									};
									f.errorCallback = function () {
										Halo.UI.InputControls.Button.showError($(u.delegateTarget))
									};
									f.execute()
								}

								var sellAmount = choice === 'keep' ? (n.unusedCount - keeporsell) : (n.unusedCount > keeporsell ? keeporsell : n.unusedCount);
								sellThis(u, sellAmount, sellAmount);
							}
						}
						$('#topArea').find('.credit-balance').remove();
						getReq(u);

					},
					enableThrobber : !0
				}, {
					text : Halo.Resources.Strings.no,
					action : 0
				}
			],
			size : 1
		});
	t.show();
 $('#left2sell').html(sellObject.left2sell);

}
$('#sellAllHalowaypointTools').click(confirmSellAll);
Halo5Requisitions.Helpers.viewReq = function (n, t) {
	var r = $('<div class="card"><img class="' + (n.haveOwned ? "" : "locked") + '" src="' + n.image + '" alt="" />' + (n.isDurable ? "" : '<div class="text--small card-count">' + Halo.Resources.Strings.x_count.replace("{0}", n.unusedCount) + "<\/div>") + '<\/div><div class="info"><div class="text--large title">' + n.name + "<\/div>" + (Utilities.Is.NullUndefinedOrWhiteSpace(n.rarity) ? "" : '<div class="energy-rarity">' + (n.energyLevel > 0 ? '<div class="energy-level energy-' + n.energyLevel + '"><\/div>' : "") + '<div class="text--small rarity rarity-' + n.rarityType + '">' + n.rarity + "<\/div><\/div>") + (n.hasCertification ? '<img class="cert" src="' + Halo.Resources.Uris.halo5ReqCertificationIconUri + '" />' : "") + "<p>" + (Utilities.Is.NullOrUndefined(n.description) ? "" : n.description) + "<\/p><\/div>"),
	e = $(r[1]),
	i,
	o,
	u,
	f;
	if (n.sellPrice > 0 && n.unusedCount > 0 && n.sellUrl) {
		i = $('<div class="sell-info"><\/div>');
		o = $('<img class="credit-icon" src="' + Halo.Resources.Uris.halo5CreditBalanceIconUri + '" /><div class="numeric--medium">' + n.sellPrice + '<\/div><div class="text--smallest">' + Halo.Resources.Strings.req_points + "<\/div>");
		i.append(o);
		i.append('<label>How many do you want to sell: </label><input style="width:45px" id="haloReqSeller-NumPicker-' + n.id + '" type="number" value="1" min="1" max="' + n.unusedCount + '"></input>');
		u = $('<button class="button" data-analytics="{pageName}:SellBack">' + Halo.Resources.Strings.sell_back + "<\/button>");
		Halo.Resources.Strings.sell_req_prompt = 'Are you sure you want to sell <strong>{0} {1}</strong> card{2} for <strong>{3} REQ points</strong>?';
		u.on("click", function () {
			var sellAmount = $('#haloReqSeller-NumPicker-' + n.id).val();
			if (parseInt(sellAmount) > parseInt(n.unusedCount)) {
				sellAmount = n.unusedCount;
				$('#haloReqSeller-NumPicker-' + n.id).val(n.unusedCount);
				alert('Error:  You do not have that many to sell, setting the amount to ' + n.unusedCount);
			}
			var t = new Utilities.Dialog({
					title : Halo.Resources.Strings.sell_card,
					content : Halo.Resources.Strings.sell_req_prompt.replace("{0}", sellAmount).replace("{1}", n.name).replace("{2}", sellAmount > 1 ? "s" : "").replace("{3}", parseInt(n.sellPrice, 10) * sellAmount) + '<br>Left to Sell:<strong><label id="left2sell">'+sellAmount+'</label></strong>',
					buttons : [{
							text : Halo.Resources.Strings.yes,
							handler : function (u) {
								var sellThis = function (u, count, original) {
									count--;
									$('#left2sell').html(count);
									var f = new Utilities.Ajax(n.sellUrl, "POST");
									f.dataBody = {
										RequisitionId : n.id,
										ExpectedSellPrice : n.sellPrice
									};
									f.successFunc = function (f) {
										if (count) {
											sellThis(u, count, original);
										} else {
											$('#haloReqSeller-NumPicker-' + n.id).attr('max', parseInt($('#haloReqSeller-NumPicker-' + n.id).attr('max')) - original);
											var e = $('.halo5-reqs.req-collection .card button[data-id="' + n.id + '"]'),
											c = r.find(".card-count").add(e.siblings(".card-count")),
											o,
											s,
											h;
											f.State === 4 ? (new Utilities.Dialog({
													content : Halo.Resources.Strings.no_cards_left_to_sell,
													buttons : [{
															text : Halo.Resources.Strings.action_ok,
															action : 0
														}
													],
													size : 1
												}).show(), t.hide(), i.hide(), c.text(Halo.Resources.Strings.x_count.replace("{0}", "0")), e.attr("data-unused-count", "0"), e.length === 0 && $('.opened-pack .req[data-id="' + n.id + '"]').remove()) : (Halo.UI.InputControls.Button.showSuccess($(u.delegateTarget), function () {
													t.hide();
													$('#topArea').prepend($('.credit-balance').clone());
												}), o = $(".halo5-reqs .credit-balance .value"), o.text(parseInt(o.text(), 10) + parseInt(f.SoldPrice, 10) * original), n.unusedCount -= original, n.unusedCount <= 0 && i.hide(), c.text(Halo.Resources.Strings.x_count.replace("{0}", n.unusedCount)), e.attr("data-unused-count", n.unusedCount), e.length === 0 && (s = $(".opened-pack .req.selected"), h = $('.opened-pack .req[data-id="' + n.id + '"]'), s.length !== 0 ? s.remove() : h.first().remove(), h.attr("data-unused-count", n.unusedCount)), t.hide())
										}
									};
									f.errorCallback = function () {
										Halo.UI.InputControls.Button.showError($(u.delegateTarget))
									};
									f.execute()
								}
								$('#topArea').find('.credit-balance').remove();
								$('#left2sell').html(sellAmount);
								sellThis(u, sellAmount, sellAmount);
							},
							enableThrobber : !0
						}, {
							text : Halo.Resources.Strings.no,
							action : 0
						}
					],
					size : 1
				});
			t.show()
		});
		i.append(u);
		e.append(i)
	}
	if (n.isWearable) {
		f = $('<button class="button" data-analytics="{pageName}:OpenSpartanCustomization/Preview">' + Halo.Resources.Strings.preview + "<\/button>");
		f.on("click", function () {
			var t = n.subcategory.toLowerCase();
			t === "helmet" ? CustomizeSpartan.open({
				Helmet : n.wearableId
			}) : t === "armorsuit" ? CustomizeSpartan.open({
				ArmorSuit : n.wearableId
			}) : t === "visor" && CustomizeSpartan.open({
				Visor : n.wearableId
			})
		});
		e.append(f)
	}
	new Utilities.Dialog({
		content : r,
		cssClass : "req-popup req",
		callback : function () {
			t && t()
		},
		size : 1
	}).show()
}
