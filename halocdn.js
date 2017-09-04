var Games, Halo5Requisitions, MasterChart;
(function (n) {
	var u = function () {
		function n() {}

		return n.init = function () {
			o.init();
			s.init();
			h.init();
			f.init();
			e.init();
			i.init();
			r.init();
			c.init();
			l.init();
			a.init();
			Halo5Requisitions.Main.init();
			var t = $(".expand-achievements");
			t.find("a").on("click", function () {
				$(".achievement--list .achievement").addClass("show").find("img").each(function (n, t) {
					var i = $(t);
					i.attr("src", i.attr("data-src"))
				});
				t.hide();
				DataVis.draw()
			});
			n.initDetailedTables();
			DataVis.draw()
		},
		n.haloMasterChiefCollectionStoreGameHistory = function (n) {
			f.initPlayers(n)
		},
		n.haloMasterChiefCollectionStoreSkillRanks = function (n) {
			e.initHoppers(n)
		},
		n.haloMasterChiefCollectionStoreMissionCollection = function (n) {
			i.initMissionCollection(n)
		},
		n.haloMasterChiefCollectionStoreMissionLeaderboard = function (n, t) {
			i.initLeaderboard(n, t)
		},
		n.haloMasterChiefCollectionStorePlaylistLeaderboard = function (n, t) {
			r.initLeaderboard(n, t)
		},
		n.haloMasterChiefCollectionStorePlaylists = function (n) {
			r.initPlaylistData(n)
		},
		n.initDetailedTables = function (n) {
			var t = n || $(".table.detailed");
			t.length !== 0 && t.each(function (n, t) {
				var e = $(t),
				i = e.find(".has-details"),
				r = i.find(".toggle-details"),
				u = r.find(".icon"),
				f = r.find(".description"),
				o = i.find(".details .hide");
				r.on("click", function () {
					var t = $(this),
					e = t.find(".icon"),
					o = t.find(".description"),
					n = t.closest(".has-details"),
					s = n.find(".details"),
					r;
					n.hasClass("details-open") ? (u.removeClass("icon--minus").addClass("icon--plus"), f.text(" " + Halo.Resources.Strings.show_more_stats), i.removeClass("details-open")) : (r = s.find(".item-list"), r.each(function (n, t) {
							var i = $(t),
							r = i.find(".item"),
							u = parseInt(i.attr("data-num-items-to-show"), 10);
							r.slice(0, u).addClass("show");
							r.slice(u).removeClass("show");
							i.find(".view-more").show()
						}), u.removeClass("icon--minus").addClass("icon--plus"), f.text(" " + Halo.Resources.Strings.show_more_stats), e.removeClass("icon--plus").addClass("icon--minus"), o.text(" " + Halo.Resources.Strings.hide_stats), i.removeClass("details-open"), n.addClass("details-open"), DataVis.draw());
					n.get(0).scrollIntoView()
				});
				o.on("click", function () {
					u.removeClass("icon--minus").addClass("icon--plus");
					f.text(" " + Halo.Resources.Strings.show_more_stats);
					var n = $(this).closest(".has-details");
					n.removeClass("details-open");
					n.get(0).scrollIntoView()
				});
				i.find(".details .item-list .view-more").on("click", function () {
					var n = $(this);
					n.closest(".item-list").find(".item").addClass("show");
					n.hide()
				})
			})
		},
		n
	}
	();
	n.Main = u;
	var t = function () {
		function n() {}

		return n.initStatToggles = function (n) {
			var t = n.find("nav"),
			u = t.find("> a"),
			i = t.find("ul a"),
			r = n.find(".selection");
			i.on("click", function (n) {
				n.preventDefault();
				var f = $(this),
				e = f.attr("data-selection-id"),
				o = r.filter(function () {
						return $(this).attr("data-selection-id") === e
					});
				r.removeClass("show");
				o.addClass("show");
				u.text(f.text());
				i.removeClass("selected");
				t.trigger("click");
				DataVis.draw()
			})
		},
		n.initOnTrendChange = function () {
			$(".trends select").on("change", function (n) {
				var i = $(".trends .stat"),
				t;
				i.hide();
				t = i.eq(parseInt(n.delegateTarget.value, 10));
				t.show();
				t.hasClass("trend") ? t.find(".chart").get(0).masterChart.update() : DataVis.draw()
			})
		},
		n
	}
	(),
	o = function () {
		function n() {}

		return n.init = function () {
			var n = $(".game-details nav");
			if (n.length !== 0) {
				var i = n.find("> a"),
				t = n.find("ul a"),
				r = $(".game-details .col").first(),
				u = $(".game-details .info");
				t.on("click", function (f) {
					f.preventDefault();
					var e = $(this),
					o = e.attr("data-offer-id"),
					s = u.filter(function () {
							return $(this).attr("data-offer-id") === o
						});
					s.detach().insertAfter(r);
					i.text(e.text());
					t.removeClass("selected");
					n.trigger("click")
				})
			}
		},
		n
	}
	(),
	s = function () {
		function n() {}

		return n.init = function () {
			n.leaderboardsFindMe();
			n.serviceRecordCampaign()
		},
		n.leaderboardsFindMe = function () {
			$(".find-me--none").on("click", function (n) {
				n.preventDefault();
				var t = $(this).data("message");
				new Utilities.Dialog({
					title : t === "global" ? Halo.Resources.Strings.halospartanassault_leaderboard_find_me_title_global : Halo.Resources.Strings.halospartanassault_leaderboard_find_me_title_social,
					content : t === "global" ? Halo.Resources.Strings.halospartanassault_leaderboard_find_me_body_global : Halo.Resources.Strings.halospartanassault_leaderboard_find_me_body_social,
					buttons : [{
							text : Halo.Resources.Strings.action_ok,
							action : 0
						}
					],
					size : 1
				}).show()
			})
		},
		n.serviceRecordCampaign = function () {
			var n = $(".service-record-campaign--halo-spartan-assault");
			if (n.length !== 0)
				n.find("#operation-dropdown ul a").on("click", function (t) {
					var i = $(this);
					n.find("#operation-star").html(i.find(".operation-star").html());
					n.find("#operation-dropdown > a").text(i.find(".title").text());
					n.find(".table.visible").removeClass("visible");
					n.find(".table[data-operation-id=" + i.data("operation-id") + "]").addClass("visible");
					$(document).trigger("click");
					t.preventDefault()
				})
		},
		n
	}
	(),
	h = function () {
		function n() {}

		return n.init = function () {
			n.achievements();
			n.campaignCompletion();
			$(window).trigger("resize")
		},
		n.campaignCompletion = function () {
			var t = $(".service-record-campaign--halomasterchiefcollection");
			if (t.length !== 0)
				t.on("click", "nav ul a", function (i) {
					var r,
					u,
					o,
					e,
					f;
					i.preventDefault();
					r = $(this);
					u = r.closest("nav");
					u.trigger("click");
					u.find("> a").text(r.text());
					r.data("game-id") ? u.find("> a").data("game-id", r.data("game-id")) : u.find("> a").data("mode-id", r.data("mode-id"));
					o = t.data("mission-route").replace("game=HaloCombatEvolved", "game=" + $("#game-dropdown > a").data("game-id")).replace("campaignMode=Solo", "campaignMode=" + $("#mode-dropdown > a").data("mode-id"));
					n.campaignCompletionRemoveLoadingIndicator();
					e = $('<h3 class="spinner-wrapper text--smallest"><span class="spinner"><\/span><span class="text"><\/span><\/h3>');
					e.find(".text").text(t.data("loading"));
					$("#halomasterchiefcollection-campaign-dropdowns").append(e);
					f = new Utilities.Ajax(o, "GET");
					f.cache = !1;
					f.successFunc = function (i) {
						t.html(i);
						t.find("nav").dropdown();
						n.campaignCompletionRemoveLoadingIndicator();
						DataVis.draw()
					};
					f.errorFunc = function () {
						$("#halomasterchiefcollection-campaign-dropdowns").find(".spinner-wrapper").text(t.data("loading-failed"))
					};
					f.execute()
				})
		},
		n.campaignCompletionRemoveLoadingIndicator = function () {
			$("#halomasterchiefcollection-campaign-dropdowns").find(".spinner-wrapper").remove()
		},
		n.achievements = function () {
			var t = $(".service-record-achievements--halomasterchiefcollection .achievement-dropdown-template"),
			n,
			i;
			if (t.length !== 0) {
				n = $(".service-record-achievements--halomasterchiefcollection .achievement-collection");
				i = t.find("> *:first").clone();
				i.insertAfter(n.find("header"));
				n.find("nav[data-dropdown]").each(function () {
					var i = $(this),
					t,
					n;
					i.dropdown();
					t = i.find("> a");
					n = t.closest(".achievement-collection");
					t.data("game-id", n.data("game-id")).text(n.find("ul a[data-game-id='" + n.data("game-id") + "']").text())
				}).on("click", "ul a", function (t) {
					t.preventDefault();
					var i = $(this);
					n.hide();
					$(".service-record-achievements--halomasterchiefcollection .achievement-collection[data-game-id='" + i.data("game-id") + "']").show();
					window.setTimeout(function () {
						$(window).trigger("resize")
					}, 0)
				});
				n.first().show();
				Utilities.Main.resizeSpriteSheets()
			}
		},
		n
	}
	(),
	f = function () {
		function n() {}

		return n.init = function () {
			n.$legend.length !== 0 && (n.attachEvents(), n.applyFilterSettings())
		},
		n.initPlayers = function (t) {
			n.players = t;
			n.updatePlayerStats();
			n.updateChart();
			n.updatePaging()
		},
		n.attachEvents = function () {
			for (var t = n.$legend.find(n.selectors.playerRow), i; t.length < n.maxPlayers; )
				i = n.createPlayerSearchRow(), i.attr("data-player-index", t.length + 1), n.$legend.append(i), t = n.$legend.find(n.selectors.playerRow);
			n.$legend.on("keydown", n.selectors.gamertagInput, n.keyDown).on("click", "a.search", n.gamertagSearchClick).on("click", "a.remove", n.removePlayerRow);
			$(n.selectors.filterSubmit).on("click", n.submitFilter);
			$(n.selectors.filterStatQuick).on("change", n.changeFilterStatQuick);
			$(n.selectors.filterToggle).on("click", n.watchTrayToggle);
			$(n.selectors.filterButtonCancel).on("click", n.watchTrayToggle)
		},
		n.changeFilterStatQuick = function (t) {
			var i = $(t.target);
			$("#tray-stat").val(i.val());
			n.saveFilterSettings();
			n.updateStatsLabels();
			n.updatePlayerStats();
			n.updateChart()
		},
		n.watchTrayToggle = function (t) {
			$(t.target).closest(n.selectors.filterContainer).hasClass("open") ? $(n.selectors.filterStatQuick).removeClass("hide") : $(n.selectors.filterStatQuick).addClass("hide")
		},
		n.applyFilterSettings = function () {
			var t = n.findFilterSettings(),
			i,
			r,
			u;
			if (!Utilities.Is.NullOrUndefined(t) && n.isFilterDataDifferent(t)) {
				$("#tray-game").val(t.Game);
				$("#tray-game-variant").val(t.GameVariant);
				$("#tray-stat").val(t.Stat);
				$(n.selectors.filterStatQuick).val(t.Stat);
				i = n.findAllGamertags();
				for (r in i)
					t.Gamertags.indexOf(i[r]) != -1 && t.Gamertags.splice(t.Gamertags.indexOf(i[r]), 1);
				t.Gamertags.length > 0 && (u = n.$legend.find(n.selectors.playerRow), u.each(function () {
						var i = $(this),
						u,
						r,
						f;
						return i.find(n.selectors.gamertagAnchor).length > 0 ? !0 : (u = t.Gamertags[0], r = n.createPlayerRow(), r.attr("data-player-index", i.attr("data-player-index")), f = r.find(n.selectors.gamertagAnchor), f.text(u).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", u)), r.insertBefore(i), i.remove(), t.Gamertags.splice(0, 1), t.Gamertags.length === 0 ? !1 : void 0)
					}), n.updateGameHistoryTable(), n.updateChart());
				n.getPlayerData()
			}
		},
		n.isFilterDataDifferent = function (n) {
			return $("#tray-game").val() !== n.Game || $("#tray-game-variant").val() !== n.GameVariant || $("#tray-stat").val() !== n.Stat || !Utilities.Is.NullOrUndefined(n.Gamertags) && n.Gamertags.length > 1
		},
		n.keyDown = function (t) {
			var i = $(this).closest(n.selectors.playerRow),
			r = i.find(n.selectors.gamertagInput).val();
			i.removeClass(n.classes.validationFailed + " " + n.classes.validationInProgress);
			t.which === Utilities.KeyCode.enter && n.validateGamertag(i, r)
		},
		n.gamertagSearchClick = function (t) {
			t.preventDefault();
			var i = $(this).closest(".tr.player"),
			r = i.find(n.selectors.gamertagInput).val();
			r.length !== 0 && n.validateGamertag(i, r)
		},
		n.submitFilter = function (t) {
			t.preventDefault();
			n.getPlayerData(1)
		},
		n.getPlayerData = function (t) {
			var r = $(n.selectors.filterSubmit),
			u,
			i;
			$(n.selectors.fetchingData).removeClass("hide");
			$(n.selectors.noData).addClass("hide");
			u = n.createStatsUri(n.findAllGamertags().join(","), t);
			i = new Utilities.Ajax(u, "GET");
			i.cache = !1;
			i.successFunc = function (i) {
				$.each(i, function () {
					n.saveStatsCollection(this)
				});
				n.setCurrentPage(t);
				n.updateStatsLabels();
				n.updatePlayerStats();
				n.updateChart();
				n.saveFilterSettings();
				n.updateGameHistoryTable();
				n.updatePaging();
				Halo.UI.InputControls.Button.endWaiting(r);
				Utilities.Tray.close();
				$(n.selectors.filterStatQuick).removeClass("hide");
				$(n.selectors.fetchingData).addClass("hide")
			};
			i.errorFunc = function () {
				Halo.UI.InputControls.Button.endWaiting(r);
				$(n.selectors.fetchingData).addClass("hide")
			};
			i.execute()
		},
		n.setCurrentPage = function (t) {
			Utilities.Is.NullOrUndefined(t) || n.$legend.attr("data-current-page-index", t).attr("data-first-game-ago-index", (t - 1) * parseInt(n.$legend.data("per-page")) + 1)
		},
		n.createStatsUri = function (t, i, r) {
			i === void 0 && (i = parseInt(n.$legend.attr("data-current-page-index")));
			r === void 0 && (r = "game-history-route");
			var u = n.$legend.data(r);
			return u = Utilities.Main.replaceUriSegment(u, "gamertags=%7Bgamertag%7D", "gamertags=" + t),
			u = Utilities.Main.replaceUriSegment(u, "game=All", "game=" + $("#tray-game").val()),
			u = Utilities.Main.replaceUriSegment(u, "gameVariant=None", "gameVariant=" + $("#tray-game-variant").val()),
			Utilities.Main.replaceUriSegment(u, /page=[\d]+/gi, "page=" + i)
		},
		n.findPlayerData = function (t) {
			if (!n.players)
				return null;
			for (var i = 0; i < n.players.length; i++)
				if (n.players[i].Gamertag === t)
					return n.players[i];
			return null
		},
		n.findCurrentUserGamertag = function () {
			return n.$legend.data("current-user-gamertag")
		},
		n.findAllGamertags = function () {
			var t = [];
			return n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				var n = $(this).text();
				n.length > 0 && t.push(n)
			}),
			t
		},
		n.findHighlightedStat = function () {
			return $("#tray-stat").val()
		},
		n.findFilterSettings = function () {
			if (!Modernizr.localstorage)
				return null;
			var t = localStorage.getItem(n.localStorageKey);
			return t ? JSON.parse(t) : null
		},
		n.findCurrentPlayerData = function () {
			return n.findPlayerData(n.$legend.data("current-user-gamertag"))
		},
		n.updateStatsLabels = function () {
			$("#display-game-title").text($("#tray-game option:selected").text());
			$("#display-game-variant-title").text($("#tray-game-variant option:selected").text());
			$(n.selectors.filterStatQuick).val($("#tray-stat").val());
			$("#display-game-stat-title").text($("#tray-stat option:selected").text())
		},
		n.updatePlayerStats = function () {
			var t = n.findPlayerData(n.findCurrentUserGamertag()),
			i = $(".mcc-stats--game-history").closest(".region");
			Utilities.Is.NullOrUndefined(t) || Utilities.Is.NullOrUndefined(t.Stats) || t.Stats.length === 0 ? i.addClass("hide") : i.removeClass("hide");
			n.$legend.find("header .highlighted-stat").text($("#tray-stat option:selected").data("total-title"));
			n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				var f = $(this),
				i = f.closest(".tr.player"),
				e = f.text(),
				r = n.findPlayerData(e),
				u,
				t;
				Utilities.Is.NullOrUndefined(r) ? i.find(".highlighted-stat").text("--") : (u = n.findHighlightedStat(), t = parseFloat(r.StatTotals[u]), u !== "KD" || isNaN(t) ? !isNaN(t) && r.Stats.length > 0 ? i.find(".highlighted-stat").text(t) : i.find(".highlighted-stat").text("--") : i.find(".highlighted-stat").text(t.toFixed(2)))
			})
		},
		n.updateGameHistoryTable = function () {
			var i = n.findCurrentPlayerData(),
			t,
			r,
			u;
			if (!Utilities.Is.NullOrUndefined(i)) {
				var f = parseInt(n.$legend.attr("data-first-game-ago-index")),
				e = n.$legend.data("won"),
				o = n.$legend.data("lost");
				for ($(".mcc-stats--game-history").find(".tr:not(.template)").remove(), t = 0; t < i.Stats.length; t++)
					r = n.templates.$gameHistoryRow.clone().removeClass("template"), u = r.html().replace("{Counter}", t + f).replace("{DateTime}", Utilities.DateTime.formatDate(Utilities.Is.NullOrUndefined(i.Stats[t]) ? new Date : new Date(i.Stats[t].DateTime))).replace("{MapId}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].LocalizedMapName).replace("{Won}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Won ? e : o).replace("{Medals}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Medals).replace("{Score}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Score).replace("{KD}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].KD.toFixed(2)).replace("{Kills}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Kills).replace("{Deaths}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Deaths).replace("{Assists}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Assists).replace("{Headshots}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].Headshots).replace("{GameType}", Utilities.Is.NullOrUndefined(i.Stats[t]) ? "--" : i.Stats[t].GameType), r.attr("data-games-ago", t), r.html(u), $(".mcc-stats--game-history").append(r)
			}
		},
		n.updatePaging = function () {
			for (var f, e, i = parseInt(n.$legend.attr("data-first-game-ago-index")), o = i + parseInt(n.$legend.data("per-page")), r = !1, s = i > 1, u = "game-history-paging-route", t = 0; t < n.players.length; t++)
				if (n.players[t].TotalMultiplayerGamesCompleted > o) {
					r = !0;
					break
				}
			r ? (f = parseInt(n.$legend.attr("data-current-page-index")) + 1, $("ol.paging li:first-child a").removeClass("hide").attr("href", n.createStatsUri(n.$legend.data("current-user-gamertag"), f, u))) : $("ol.paging li:first-child a").addClass("hide");
			s ? (e = Math.max(1, parseInt(n.$legend.attr("data-current-page-index")) - 1), $("ol.paging li:last-child a").removeClass("hide").attr("href", n.createStatsUri(n.$legend.data("current-user-gamertag"), e, u))) : $("ol.paging li:last-child a").addClass("hide")
		},
		n.removePlayerRow = function (t) {
			t.preventDefault();
			var i = $(this).closest(n.selectors.playerRow),
			u = i.find(n.selectors.gamertagAnchor).text(),
			r = n.createPlayerSearchRow();
			r.attr("data-player-index", i.attr("data-player-index"));
			n.removePlayerFromLegend(u);
			r.insertBefore(i);
			i.remove();
			n.saveFilterSettings();
			n.updatePaging()
		},
		n.createPlayerSearchRow = function () {
			var t = $(n.templates.playerSearch);
			return t.find("input[type=text]").attr("placeholder", n.$legend.data("gamertag-placeholder")),
			t
		},
		n.createPlayerRow = function () {
			var t = $(n.templates.playerRow);
			return t.find(".td.remove-player a.remove").text(Halo.Resources.Strings.action_remove),
			t.find(".td.gamertag a.remove").attr("title", Halo.Resources.Strings.action_remove),
			t
		},
		n.validateGamertag = function (t, i) {
			if (t.removeClass(n.classes.validationFailed), n.isGamertagInLegend(i)) {
				t.addClass(n.classes.validationFailed);
				t.find("span.failure").text(n.$legend.data("gamertag-already-exists"));
				return
			}
			t.addClass(n.classes.validationInProgress);
			var r = new Utilities.Ajax(Halo.Resources.Uris.verifyGamertagUri, "GET");
			r.cache = !1;
			r.dataBody = {
				gamertag : i
			};
			r.successFunc = function () {
				n.addPlayerToLegend(i, t)
			};
			r.errorFunc = function () {
				t.addClass(n.classes.validationFailed).removeClass(n.classes.validationInProgress);
				t.find("span.failure").text(n.$legend.data("gamertag-not-found"))
			};
			r.fireAndForget()
		},
		n.isGamertagInLegend = function (t) {
			var i = !1;
			return n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				if ($(this).text().toLowerCase() === t.toLowerCase())
					return i = !0, !1
			}),
			i
		},
		n.addPlayerToLegend = function (t, i) {
			var r = new Utilities.Ajax(n.createStatsUri(t), "GET");
			r.cache = !1;
			r.successFunc = function (r) {
				var u = n.createPlayerRow(),
				e,
				f;
				u.attr("data-player-index", i.attr("data-player-index"));
				e = u.find(n.selectors.gamertagAnchor);
				f = !Utilities.Is.NullOrUndefined(r) && r.length > 0 ? r[0].Gamertag : t;
				e.text(f).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", f));
				u.insertBefore(i);
				i.remove();
				!Utilities.Is.NullOrUndefined(r) && r.length > 0 && n.saveStatsCollection(r[0]);
				n.updatePlayerStats();
				n.updateChart();
				n.updatePaging();
				n.saveFilterSettings()
			};
			r.errorFunc = function () {};
			r.execute()
		},
		n.saveStatsCollection = function (t) {
			var i,
			u,
			r;
			for (n.removePlayerData(t.Gamertag), i = t, u = 0, i.StatTotals = {
					Assists : 0,
					Deaths : 0,
					Headshots : 0,
					Kills : 0,
					Score : 0,
					KD : 0
				}, r = 0; r < i.Stats.length; r++)
				i.Stats[r] && (i.StatTotals.Assists += i.Stats[r].Assists, i.StatTotals.Deaths += i.Stats[r].Deaths, i.StatTotals.Headshots += i.Stats[r].Headshots, i.StatTotals.Kills += i.Stats[r].Kills, i.StatTotals.Score += i.Stats[r].Score, i.StatTotals.KD += i.Stats[r].KD, u++);
			i.StatTotals.KD = Math.floor(i.StatTotals.KD / u * 100) / 100;
			n.players.push(i)
		},
		n.removePlayerData = function (t) {
			for (var i = n.players.length - 1; i >= 0; i--)
				n.players[i].Gamertag === t && n.players.splice(i, 1)
		},
		n.removePlayerFromLegend = function (t) {
			n.removePlayerData(t);
			n.updateChart()
		},
		n.updateChart = function () {
			for (var o, f, s, h, r = [], t = [], u = [], a = n.$legend.find(n.selectors.playerRow), e = parseInt(n.$legend.data("per-page")), c = n.findHighlightedStat(), i = [], l = 0; l < e; l++)
				i.push(null);
			for (o = parseInt(n.$legend.attr("data-first-game-ago-index")), f = o; f < o + e; f++)
				r.push(f);
			r = r.reverse();
			a.each(function (r, f) {
				var y = $(f),
				v = y.find(n.selectors.gamertagAnchor).text(),
				o,
				h,
				l,
				s,
				a;
				if (v) {
					if (o = n.findPlayerData(v), Utilities.Is.NullOrUndefined(o) || o.Stats.length === 0) {
						t.push(i);
						u.push(i);
						return
					}
					for (h = [], l = [], s = 0; s < o.Stats.length; s++) {
						if (Utilities.Is.NullOrUndefined(o.Stats[s]) || Utilities.Is.NullOrUndefined(o.Stats[s][c])) {
							h.unshift(null);
							l.unshift(null);
							continue
						}
						h.unshift(o.Stats[s][c]);
						l.unshift(o.Stats[s].GameType)
					}
					for (a = h.length; a < e; a++)
						h.unshift(null), l.unshift(null);
					t.push(h);
					u.push(l)
				} else
					t.push(i), u.push(i)
			});
			n.isSeriesDataEmpty(t) ? $(n.selectors.noData).removeClass("hide") : $(n.selectors.noData).addClass("hide");
			s = $(".chart.chart--line:first");
			s.get(0).masterChart.update(null, {
				labels : r,
				series : t,
				seriesTypes : u
			});
			h = function (n, t, i, r, u) {
				return -r * (t /= u) * (t - 2) + i
			};
			s.find(".point").on("mouseenter", function (t) {
				var i = $(this);
				Halo.UI.Tooltip.linkHoverOver(t, function () {
					if (Utilities.Is.NullOrUndefined(i.attr("data-header"))) {
						var t = parseFloat(i.attr("ct:value")),
						r = n.convertSeriesToGamertag(i.closest("g").attr("class"));
						i.attr("data-header", r).attr("data-text", $("#tray-stat option:selected").val() + ": " + t)
					}
				}, function () {
					i.animate({
						"stroke-width" : 16
					}, 200, h)
				})
			}).on("mouseleave", function (n) {
				var t = $(this);
				Halo.UI.Tooltip.linkHoverOut(n, function () {
					t.animate({
						"stroke-width" : 2
					}, 200, h)
				})
			}).on("mousemove", function (n) {
				Halo.UI.Tooltip.linkMouseMove(n)
			})
		},
		n.convertSeriesToGamertag = function (t) {
			var r = "",
			i = /series\-([abcde])/gi.exec(t),
			u;
			return !Utilities.Is.NullOrUndefined(i) && i.length > 1 && (u = i[1].toLowerCase().charCodeAt(0) - 97, r = n.players[u].Gamertag),
			r
		},
		n.isSeriesDataEmpty = function (n) {
			var t,
			i;
			if (n === null || n === undefined || n.length === 0)
				return !0;
			for (t in n)
				if (n[t] !== null && n[t].length !== 0)
					for (i in n[t])
						if (n[t][i] !== null)
							return !1;
			return !0
		},
		n.saveFilterSettings = function () {
			if (Modernizr.localstorage) {
				var t = {
					Game : $("#tray-game").val(),
					GameVariant : $("#tray-game-variant").val(),
					Stat : $("#tray-stat").val(),
					Gamertags : n.findAllGamertags()
				};
				localStorage.setItem(n.localStorageKey, JSON.stringify(t))
			}
		},
		n.$legend = $(".mcc-stats--game-history-legend"),
		n.selectors = {
			filterSubmit : ".tray-container--halomasterchiefcollection-game-history .button[name='confirm']",
			filterStatQuick : "#tray-stat-quick",
			playerRow : ".tr.player",
			gamertagInput : ".gamertag input[type='text']",
			gamertagAnchor : ".gamertag a.case-sensitive",
			filterToggle : ".tray-container--halomasterchiefcollection-game-history .tray-toggle",
			filterContainer : ".tray-container--halomasterchiefcollection-game-history",
			filterButtonCancel : ".tray-container--halomasterchiefcollection-game-history .button.cancel",
			noData : ".no-data",
			fetchingData : ".fetching-data"
		},
		n.classes = {
			validationFailed : "validation-failed",
			validationInProgress : "validating"
		},
		n.templates = {
			playerSearch : '<div class="tr player player--search text--medium"><div class="td-g"><div class="td span-6 gamertag"><div class="suffixed-textbox"><input type="text" maxlength="15" /><a href="#" class="search"><span><\/span><\/a><\/div><\/div><div class="td span-6 highlighted-stat"><span class="failure"><\/span><span class="searching"><span class="spinner"><\/span><\/span><\/div><\/div><\/div>',
			playerRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-8 gamertag"><a href="" class="case-sensitive"><\/a><a class="remove" href="#"><\/a><\/div><div class="td span-2 highlighted-stat"><\/div><div class="td span-2 remove-player"><a href="#" class="remove"><\/a><\/div><\/div><\/div>',
			$gameHistoryRow : $(".mcc-stats--game-history .template")
		},
		n.maxPlayers = 4,
		n.localStorageKey = "mcc_gh_" + n.findCurrentUserGamertag(),
		n
	}
	(),
	e = function () {
		function n() {}

		return n.init = function () {
			n.$legend.length !== 0 && (n.attachEvents(), n.applyFilterSettings())
		},
		n.initHoppers = function (t) {
			n.hopperData = t;
			n.updatePlayerStats();
			n.updateChart()
		},
		n.attachEvents = function () {
			for (var t = n.$legend.find(n.selectors.playerRow), i; t.length < n.maxPlayers; )
				i = n.createPlayerSearchRow(), i.attr("data-player-index", t.length + 1), n.$legend.append(i), t = n.$legend.find(n.selectors.playerRow);
			n.$legend.on("keydown", n.selectors.gamertagInput, n.keyDown).on("click", "a.search", n.searchClick).on("click", "a.remove", n.removePlayerRow);
			$(n.selectors.toggleMore).on("click", n.toggleMore)
		},
		n.applyFilterSettings = function () {
			var t = n.findFilterSettings(),
			i,
			r,
			u;
			if (!Utilities.Is.NullOrUndefined(t)) {
				i = n.findAllGamertags();
				for (r in i)
					t.Gamertags.indexOf(i[r]) !== -1 && t.Gamertags.splice(t.Gamertags.indexOf(i[r]), 1);
				t.Gamertags.length > 0 && (u = n.$legend.find(n.selectors.playerRow), u.each(function () {
						var r = $(this),
						u,
						i,
						f;
						return r.find(n.selectors.gamertagAnchor).length > 0 ? !0 : (u = t.Gamertags[0], i = n.createPlayerRow(), i.attr("data-player-index", r.attr("data-player-index")), f = i.find(n.selectors.gamertagAnchor), f.text(u).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", u)), i.insertBefore(r), r.remove(), n.addPlayerToLegend(u, i), t.Gamertags.splice(0, 1), t.Gamertags.length === 0 ? !1 : void 0)
					}))
			}
		},
		n.toggleMore = function (t) {
			t.preventDefault();
			var i = $(t.target),
			r = $(".ordered-skill-ranks");
			r.hasClass(n.classes.showAll) ? (r.removeClass(n.classes.showAll), i.text(i.data("show-more"))) : (r.addClass(n.classes.showAll), i.text(i.data("show-less")), n.updateChart())
		},
		n.keyDown = function (t) {
			var i = $(this).closest(n.selectors.playerRow),
			r = i.find(n.selectors.gamertagInput).val();
			i.removeClass(n.classes.validationFailed + " " + n.classes.validationInProgress);
			t.which === Utilities.KeyCode.enter && n.validateGamertag(i, r)
		},
		n.searchClick = function (t) {
			t.preventDefault();
			var i = $(this).closest(n.selectors.playerRow),
			r = i.find(n.selectors.gamertagInput).val();
			r.length !== 0 && n.validateGamertag(i, r)
		},
		n.findCurrentUserGamertag = function () {
			return n.$legend.data("current-user-gamertag")
		},
		n.findAllGamertags = function () {
			var t = [];
			return n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				var n = $(this).text();
				n.length > 0 && t.push(n)
			}),
			t
		},
		n.updatePlayerStats = function () {
			n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				var i = $(this),
				r = i.closest(n.selectors.playerRow),
				u = i.text(),
				t = n.findBestHopperForPlayer(u);
				t.HopperName === "" ? r.find(n.selectors.highlightedStat).text("--") : r.find(n.selectors.highlightedStat).text(t.SkillRank + " - " + t.HopperName)
			})
		},
		n.findBestHopperForPlayer = function (t) {
			var f = "",
			u = 0,
			i,
			r;
			for (i in n.hopperData)
				for (r = 0; r < n.hopperData[i].length; r++)
					n.hopperData[i][r].Gamertag === t && n.hopperData[i][r].SkillRank > Math.floor(u) && (f = i, u = n.hopperData[i][r].SkillRank);
			return {
				Gamertag : t,
				HopperName : f,
				SkillRank : u
			}
		},
		n.findSkillRankData = function (t, i) {
			var r,
			u;
			for (r in n.hopperData)
				if (r === t)
					for (u = 0; u < n.hopperData[r].length; u++)
						if (n.hopperData[r][u].Gamertag === i)
							return n.hopperData[r][u];
			return null
		},
		n.findGamertagInHopperData = function (n) {
			var i,
			t;
			for (i in n)
				if (t = n[i], t.length > 0)
					return t[0].Gamertag
		},
		n.findFilterSettings = function () {
			if (!Modernizr.localstorage)
				return null;
			var t = localStorage.getItem(n.localStorageKey);
			return t ? JSON.parse(t) : null
		},
		n.addPlayerToLegend = function (t, i) {
			var r = new Utilities.Ajax(n.createStatsUri(t), "GET");
			r.cache = !1;
			r.successFunc = function (r) {
				var f = n.createPlayerRow(),
				e,
				u;
				f.attr("data-player-index", i.attr("data-player-index"));
				e = f.find(n.selectors.gamertagAnchor);
				u = n.findGamertagInHopperData(r);
				Utilities.Is.NullUndefinedOrWhiteSpace(u) && (u = t);
				e.text(u).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", u));
				f.insertBefore(i);
				i.remove();
				n.addSkillRanks(r);
				n.updatePlayerStats();
				n.updateCurrentSkillRanks();
				n.updateChart();
				n.saveFilterSettings()
			};
			r.errorFunc = function () {};
			r.execute()
		},
		n.addSkillRanks = function (t) {
			var i,
			r;
			for (i in t)
				for (r = 0; r < t[i].length; r++)
					n.removePlayerData(t[i][r].Gamertag, i), n.hopperData[i].push(t[i][r])
		},
		n.createPlayerSearchRow = function () {
			var t = $(n.templates.playerSearch);
			return t.find("input[type='text']").attr("placeholder", n.$legend.data("gamertag-placeholder")),
			t
		},
		n.createPlayerRow = function () {
			var t = $(n.templates.playerRow);
			return t.find(".td.remove-player a.remove").text(Halo.Resources.Strings.action_remove),
			t.find(".td.gamertag a.remove").attr("title", Halo.Resources.Strings.action_remove),
			t
		},
		n.removePlayerRow = function (t) {
			t.preventDefault();
			var i = $(this).closest(n.selectors.playerRow),
			u = i.find(n.selectors.gamertagAnchor).text(),
			r = n.createPlayerSearchRow();
			r.attr("data-player-index", i.attr("data-player-index"));
			r.insertBefore(i);
			i.remove();
			n.removePlayer(u);
			n.saveFilterSettings()
		},
		n.removePlayerData = function (t, i) {
			var r,
			u;
			for (r in n.hopperData)
				if (Utilities.Is.NullOrUndefined(i) || i === r)
					for (u = n.hopperData[r].length - 1; u >= 0; u--)
						n.hopperData[r][u].Gamertag === t && n.hopperData[r].splice(u, 1)
		},
		n.removePlayer = function (t) {
			n.removePlayerData(t);
			n.updateCurrentSkillRanks();
			n.updateChart()
		},
		n.validateGamertag = function (t, i) {
			if (t.removeClass(n.classes.validationFailed), n.isGamertagOnLegend(i)) {
				t.addClass(n.classes.validationFailed);
				t.find("span.failure").text(n.$legend.data("gamertag-already-exists"));
				return
			}
			t.addClass(n.classes.validationInProgress);
			var r = new Utilities.Ajax(Halo.Resources.Uris.verifyGamertagUri, "GET");
			r.cache = !1;
			r.dataBody = {
				gamertag : i
			};
			r.successFunc = function () {
				n.addPlayerToLegend(i, t)
			};
			r.errorFunc = function () {
				t.addClass(n.classes.validationFailed).removeClass(n.classes.validationInProgress);
				t.find("span.failure").text(n.$legend.data("gamertag-not-found"))
			};
			r.fireAndForget()
		},
		n.isGamertagOnLegend = function (t) {
			var i = !1;
			return n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				if ($(this).text().toLowerCase() === t)
					return i = !0, !1
			}),
			i
		},
		n.createStatsUri = function (t) {
			var i = n.$legend.data("skill-rank-route");
			return Utilities.Main.replaceUriSegment(i, "gamertags=%7Bgamertag%7D", "gamertags=" + t)
		},
		n.updateCurrentSkillRanks = function () {
			var i = $(".mcc-stats--skill-ranks-current"),
			r = n.$legend.find(n.selectors.playerRow),
			t = 0;
			r.each(function () {
				var f = $(this),
				e = i.find(".hopper-name"),
				r = f.find(n.selectors.gamertagAnchor).text(),
				u;
				t++;
				u = i.find("> header .player-index-" + (t - 1));
				r !== "" ? u.text(r) : u.text("");
				e.each(function () {
					var f = $(this),
					i = f.siblings(".player-index-" + (t - 1)),
					u = n.findSkillRankData(f.data("hopper-name"), r);
					Utilities.Is.NullOrUndefined(u) ? i.find(".gamertag, .skill-rank").text("") : (i.find(".gamertag").text(u.Gamertag), i.find(".skill-rank").text(u.SkillRank))
				})
			})
		},
		n.updateChart = function () {
			var e = n.$legend.find(n.selectors.playerRow),
			r,
			t,
			i,
			u,
			f;
			for (r in n.hopperData)
				t = [], e.each(function () {
					var u = $(this),
					f = u.find(n.selectors.gamertagAnchor).text(),
					i = n.findSkillRankData(r, f);
					Utilities.Is.NullOrUndefined(i) ? t.push([0]) : t.push([i.SkillRank])
				}), t = n.trimHopperData(t), i = $(".chart[data-hopper-name='" + r + "']"), u = 50 + t.length * 25, i.height(u), i.get(0).masterChart.update(null, {
					labels : JSON.parse(i.attr("data-chart-labels")),
					series : t
				});
			f = $(".chart");
			f.find(".bar").on("mouseenter", function (t) {
				Halo.UI.Tooltip.linkHoverOver(t, function (t) {
					var i = $(t.target);
					if (Utilities.Is.NullOrUndefined(i.attr("data-header"))) {
						var r = n.findHopperNameForChartBar(i) + ": " + parseFloat(i.attr("ct:value")),
						u = n.convertSeriesToGamertag(i.closest("g").attr("class"));
						i.attr("data-header", u).attr("data-text", r)
					}
				})
			}).on("mouseleave", function (n) {
				Halo.UI.Tooltip.linkHoverOut(n)
			}).on("mousemove", function (n) {
				Halo.UI.Tooltip.linkMouseMove(n)
			})
		},
		n.findHopperNameForChartBar = function (t) {
			var i = t.closest(n.selectors.skillRankRow);
			return i.find(n.selectors.hopperName).text()
		},
		n.convertSeriesToGamertag = function (t) {
			var i = /series\-([abcde])/gi.exec(t),
			r;
			return !Utilities.Is.NullOrUndefined(i) && i.length > 1 ? (r = i[1].toLowerCase().charCodeAt(0) - 97, $(n.$legend.find(n.selectors.playerRow).get(r)).find(n.selectors.gamertagAnchor).text()) : null
		},
		n.trimHopperData = function (n) {
			for (var t = n.length - 1; t >= 0; t--) {
				if (n[t] !== null && n[t][0] !== 0)
					break;
				n.splice(t, 1)
			}
			return n
		},
		n.saveFilterSettings = function () {
			if (Modernizr.localstorage) {
				var t = {
					Gamertags : n.findAllGamertags()
				};
				localStorage.setItem(n.localStorageKey, JSON.stringify(t))
			}
		},
		n.$legend = $(".mcc-stats--skill-ranks"),
		n.selectors = {
			playerRow : ".tr.player",
			gamertagInput : ".gamertag input[type='text']",
			gamertagAnchor : ".gamertag a.case-sensitive",
			toggleMore : ".ordered-skill-ranks-toggle a",
			highlightedStat : ".highlighted-stat",
			skillRankRow : ".row.halomasterchiefcollection-skill-rank-charts",
			hopperName : ".hopper-name"
		},
		n.classes = {
			validationFailed : "validation-failed",
			validationInProgress : "validating",
			showAll : "show-all"
		},
		n.templates = {
			playerSearch : '<div class="tr player player--search text--medium"><div class="td-g"><div class="td span-6 gamertag"><div class="suffixed-textbox"><input type="text" maxlength="15" /><a href="#" class="search"><span><\/span><\/a><\/div><\/div><div class="td span-6 highlighted-stat"><span class="failure"><\/span><span class="searching"><span class="spinner"><\/span><\/span><\/div><\/div><\/div>',
			playerRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-6 gamertag"><a href="" class="case-sensitive"><\/a><a class="remove" href="#"><\/a><\/div><div class="td span-4 highlighted-stat"><\/div><div class="td span-2 remove-player"><a href="#" class="remove"><\/a><\/div><\/div><\/div>'
		},
		n.maxPlayers = 4,
		n.localStorageKey = "mcc_sr_" + n.findCurrentUserGamertag(),
		n
	}
	(),
	i = function () {
		function n() {}

		return n.init = function () {
			n.$legend.length !== 0 && n.attachEvents()
		},
		n.initMissionCollection = function (t) {
			n.missionData = t.Games;
			n.singlePlayerMissionsOnly = t.SinglePlayerMissionsOnly;
			n.campaignModes = t.CampaignModes;
			n.applyFilterSettings()
		},
		n.initLeaderboard = function (t, i) {
			n.leaderboard = i;
			n.leaderboardStat = t;
			n.updatePlayerStats();
			n.updateChart();
			n.updateLegendHeader();
			n.updateCheckpointBreakdown();
			n.showFilterSettingsOnFirstVisit()
		},
		n.showFilterSettingsOnFirstVisit = function () {
			Utilities.Is.NullOrUndefined(localStorage.getItem(n.storagePrefix)) && Utilities.Tray.open($(n.selectors.filterToggle))
		},
		n.findCurrentUserGamertag = function () {
			return n.$legend.data("current-user-gamertag")
		},
		n.attachEvents = function () {
			$(n.selectors.filterSubmit).on("click", n.submitFilter);
			$(n.selectors.filterGameDropdown).on("change", n.currentGameChanged);
			$(n.selectors.filterMissionDropdown).on("change", n.currentMissionChanged)
		},
		n.submitFilter = function (t) {
			t.preventDefault();
			n.getPlayerData()
		},
		n.getPlayerData = function () {
			var i = $(n.selectors.filterSubmit),
			r,
			t;
			$(n.selectors.fetchingData).removeClass("hide");
			$(n.selectors.noData).addClass("hide");
			r = n.createStatsUri();
			t = new Utilities.Ajax(r, "GET");
			t.cache = !1;
			t.successFunc = function (t) {
				n.leaderboard = t;
				n.leaderboardStat = $("#tray-leaderboard-stat").val();
				n.updatePlayerStats();
				n.updateStatsLabels();
				n.updateChart();
				n.updateLegendHeader();
				n.updateCheckpointBreakdown();
				n.saveFilterSettings();
				Halo.UI.InputControls.Button.endWaiting(i);
				Utilities.Tray.close();
				$(n.selectors.fetchingData).addClass("hide")
			};
			t.errorFunc = function () {
				Halo.UI.InputControls.Button.endWaiting(i);
				$(n.selectors.fetchingData).addClass("hide")
			};
			t.execute()
		},
		n.currentGameChanged = function () {
			var t,
			r,
			i;
			if (!Utilities.Is.NullOrUndefined(n.missionData) && (t = $(n.selectors.filterGameDropdown).val(), !Utilities.Is.NullOrUndefined(n.missionData[t]))) {
				for (r = $("#tray-mission-id"), r.find("option").remove(), i = 0; i < n.missionData[t].length; i++)
					r.append('<option value="' + n.missionData[t][i].MissionId + '">' + n.missionData[t][i].MissionName + "<\/option>");
				n.currentMissionChanged()
			}
		},
		n.currentMissionChanged = function () {
			var i,
			r,
			t,
			u;
			if (!Utilities.Is.NullOrUndefined(n.missionData))
				for (i = parseInt($(n.selectors.filterMissionDropdown).val()), r = $(n.selectors.filterCampaignMode).val(), $(n.selectors.filterCampaignMode).find("option").remove(), t = 0; t < n.campaignModes.length; t++)
					(n.singlePlayerMissionsOnly.indexOf(i) === -1 || n.campaignModes[t].Value !== "Coop") && (u = r === n.campaignModes[t].Value ? ' selected="selected"' : "", $(n.selectors.filterCampaignMode).append('<option value="' + n.campaignModes[t].Value + '"' + u + ">" + n.campaignModes[t].Name + "<\/option>"))
		},
		n.updateStatsLabels = function () {
			$("#display-mission-title").text($("#tray-game option:selected").text() + " - " + $("#tray-mission-id option:selected").text() + " (" + $("#tray-campaign-mode option:selected").text() + ")");
			$("#display-leaderboard-type").text($("#tray-leaderboard-type option:selected").text());
			$("#display-leaderboard-stat-title").text($("#tray-leaderboard-stat option:selected").text())
		},
		n.isCurrentUserAvailable = function () {
			if (Utilities.Is.NullOrUndefined(n.leaderboard.CurrentUser))
				return !1;
			for (var t = 0; t < n.leaderboard.LeaderboardUsers.length; t++)
				if (!Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[t]) && n.leaderboard.LeaderboardUsers[t].Gamertag === n.leaderboard.CurrentUser.Gamertag)
					return !1;
			return !0
		},
		n.updatePlayerStats = function () {
			var r,
			u,
			f,
			t,
			i;
			n.$legend.find(n.selectors.playerRow + "," + n.selectors.topXGlobalRow).remove();
			n.isCurrentUserAvailable() && (r = $(n.templates.playerRow), r.addClass("me").find(n.selectors.gamertagAnchor).text(n.leaderboard.CurrentUser.Gamertag).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", n.leaderboard.CurrentUser.Gamertag)), n.$legend.append(r));
			$("#tray-leaderboard-type").val() === "Global" && n.leaderboard.LeaderboardUsers.length > 0 && (u = n.$legend.data("top-x-global").replace("{0}", n.leaderboard.LeaderboardUsers.length), f = $('<header class="td-g desktop topXGlobal"><div class="td span-12 text--medium">' + u + "<\/div><\/header>"), n.$legend.append(f));
			for (t in n.leaderboard.LeaderboardUsers)
				Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[t]) || (i = $(n.templates.playerRow), i.find(n.selectors.gamertagAnchor).text(n.leaderboard.LeaderboardUsers[t].Gamertag).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", n.leaderboard.LeaderboardUsers[t].Gamertag)), n.leaderboard.LeaderboardUsers[t].Gamertag === n.findCurrentUserGamertag() && i.addClass("me"), n.$legend.append(i));
			n.$legend.find(n.selectors.gamertagAnchor).each(function () {
				var i = $(this),
				r = i.closest(".tr.player"),
				t = n.findLeaderboardUser(i.text());
				Utilities.Is.NullOrUndefined(t) || (i.attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", t.Gamertag)).text(t.Gamertag), r.find(".stat-score").text(t.BestScore), r.find(".stat-time").text(Utilities.DateTime.formatTimeSpan(t.BestTime)))
			});
			n.$legend.find(n.selectors.playerRow).length === 0 ? n.$legend.addClass("hide") : n.$legend.removeClass("hide");
			n.setScoreAndTimeClasses(n.$legend.find(".stat-score"), n.$legend.find(".stat-time"))
		},
		n.createStatsUri = function () {
			var t = n.$legend.data("stats-route");
			return t = Utilities.Main.replaceUriSegment(t, "/score", "/" + $("#tray-leaderboard-stat").val().toLowerCase()),
			t = Utilities.Main.replaceUriSegment(t, "missionId=0", "missionId=" + $("#tray-mission-id").val()),
			t = Utilities.Main.replaceUriSegment(t, "type=Friends", "type=" + $("#tray-leaderboard-type").val()),
			t = Utilities.Main.replaceUriSegment(t, "difficulty=None", "difficulty=" + $("#tray-difficulty").val()),
			Utilities.Main.replaceUriSegment(t, "campaignMode=Solo", "campaignMode=" + $("#tray-campaign-mode").val())
		},
		n.findLeaderboardUser = function (t) {
			for (var i = 0; i < n.leaderboard.LeaderboardUsers.length; i++)
				if (!Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[i]) && n.leaderboard.LeaderboardUsers[i].Gamertag === t)
					return n.leaderboard.LeaderboardUsers[i];
			return n.leaderboard.CurrentUser.Gamertag === t ? n.leaderboard.CurrentUser : null
		},
		n.updateLegendHeader = function () {
			var t = n.$legend.find("header .stat-score"),
			i = n.$legend.find("header .stat-time");
			n.setScoreAndTimeClasses(t, i)
		},
		n.setScoreAndTimeClasses = function (t, i) {
			n.isScoreStatSelected() ? (t.addClass("highlighted-stat").removeClass("secondary-stat"), i.removeClass("highlighted-stat").addClass("secondary-stat")) : (t.removeClass("highlighted-stat").addClass("secondary-stat"), i.addClass("highlighted-stat").removeClass("secondary-stat"))
		},
		n.updateChart = function () {
			for (var h, s, t = [], i = [], u = [], c = n.$legend.find(n.selectors.playerRow), f = n.findMaxSegmentCount(), e = !1, r = [], o = 0; o < f; o++)
				r.push(null), u.push(o + 1);
			c.each(function (u, o) {
				var g = $(o),
				v = g.find(n.selectors.gamertagAnchor).text(),
				k = !0,
				d = !0,
				s,
				l,
				y,
				h,
				p,
				a,
				w,
				c,
				b;
				if (Utilities.Is.NullOrUndefined(v) || v.length === 0)
					t.push(r), i.push(r);
				else {
					if (s = n.findLeaderboardUser(v), Utilities.Is.NullOrUndefined(s)) {
						t.push(r);
						i.push(r);
						return
					}
					if (s.ScorePerSegment.length === 0 && (t.push(r), k = !1), s.TimePerSegment.length === 0 && (i.push(r), d = !1), k) {
						for (l = [], y = 0, h = 0; h < s.ScorePerSegment.length; h++)
							Utilities.Is.NullOrUndefined(s.ScorePerSegment[h]) || (l.push(s.ScorePerSegment[h]), y++, e = !0);
						for (p = y; p < f; p++)
							l.push(null);
						t.push(l)
					}
					if (d) {
						for (a = [], w = 0, c = 0; c < s.TimePerSegment.length; c++)
							Utilities.Is.NullOrUndefined(s.TimePerSegment[c]) || (a.push(s.TimePerSegment[c]), w++, e = !0);
						for (b = w; b < f; b++)
							a.push(null);
						i.push(a)
					}
				}
			});
			e ? $(n.selectors.noData).addClass("hide") : $(n.selectors.noData).removeClass("hide");
			h = $(".chart.chart--line:first");
			s = null;
			n.isScoreStatSelected() || (s = {
					axisY : {
						labelInterpolationFnc : MasterChart.timespan
					}
				});
			u.length === 0 && (u = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n.isScoreStatSelected() && t.length === 0 && (t = [[null, null, null, null, null, null, null, null, null, null]]), n.isScoreStatSelected() || i.length !== 0 || (i = [[null, null, null, null, null, null, null, null, null, null]]));
			h.get(0).masterChart.update(s, {
				labels : u,
				series : n.isScoreStatSelected() ? t : i
			})
		},
		n.findMaxSegmentCount = function () {
			for (var t = 0, i = 0; i < n.leaderboard.LeaderboardUsers.length; i++)
				Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[i]) || (n.isScoreStatSelected() ? n.leaderboard.LeaderboardUsers[i].ScorePerSegment.length > t && (t = n.leaderboard.LeaderboardUsers[i].ScorePerSegment.length) : n.leaderboard.LeaderboardUsers[i].TimePerSegment.length > t && (t = n.leaderboard.LeaderboardUsers[i].TimePerSegment.length));
			return Utilities.Is.NullOrUndefined(n.leaderboard.CurrentUser) || (n.isScoreStatSelected() ? n.leaderboard.CurrentUser.ScorePerSegment.length > t && (t = n.leaderboard.CurrentUser.ScorePerSegment.length) : n.leaderboard.CurrentUser.TimePerSegment.length > t && (t = n.leaderboard.CurrentUser.TimePerSegment.length)),
			t
		},
		n.updateCheckpointBreakdown = function () {
			var i = $(".checkpoint-breakdown"),
			e,
			r,
			u,
			t,
			f;
			for (i.find(".table.mcc-stats--checkpoints").remove(), e = n.findMaxSegmentCount(), r = 0; r < e; r++) {
				for (u = $(n.templates.checkpointBreakdownTable), t = $(n.templates.checkpointBreakdownHeader), t.find(".checkpoint-title").text(n.$legend.data("checkpoint-format").replace("{0}", r + 1)), t.find(".stat-score").text(n.$legend.data("highest-score")), t.find(".stat-time").text(n.$legend.data("fastest-time")), n.setScoreAndTimeClasses(t.find(".stat-score"), t.find(".stat-time")), u.append(t), n.isCurrentUserAvailable() && u.append(n.createPlayerRowForCheckpointBreakdown(n.leaderboard.CurrentUser, r)), f = 0; f < n.leaderboard.LeaderboardUsers.length; f++)
					Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[f]) || u.append(n.createPlayerRowForCheckpointBreakdown(n.leaderboard.LeaderboardUsers[f], r));
				i.find("> .content").append(u)
			}
			e === 0 ? i.addClass("hide") : (n.setScoreAndTimeClasses(i.find(".stat-score"), i.find(".stat-time")), i.removeClass("hide"))
		},
		n.createPlayerRowForCheckpointBreakdown = function (t, i) {
			var r = $(n.templates.checkpointBreakdownRow),
			u,
			f;
			return r.find(n.selectors.gamertagAnchor).text(t.Gamertag).attr("href", n.$legend.data("check-gamertag-route").replace("gamertag", t.Gamertag)),
			u = t.ScorePerSegment.length >= i - 1 && !Utilities.Is.NullOrUndefined(t.ScorePerSegment[i]) ? t.ScorePerSegment[i].toString() : "--",
			r.find(".stat-score").text(u),
			f = t.TimePerSegment.length >= i - 1 && !Utilities.Is.NullOrUndefined(t.TimePerSegment[i]) ? Utilities.DateTime.formatTimeSpan(t.TimePerSegment[i]) : "--",
			r.find(".stat-time").text(f),
			t.Gamertag === n.findCurrentUserGamertag() && r.addClass("me"),
			r
		},
		n.isScoreStatSelected = function () {
			return n.leaderboardStat === "Score"
		},
		n.applyFilterSettings = function () {
			var t = n.findFilterSettings();
			!Utilities.Is.NullOrUndefined(t) && n.filterSettingsAreDifferent(t) && ($("#tray-leaderboard-type").val(t.Leaderboard), $("#tray-difficulty").val(t.Difficulty), $("#tray-game").val(t.Game), n.currentGameChanged(), $("#tray-mission-id").val(t.MissionId), $("#tray-leaderboard-stat").val(t.Stat), $("#tray-campaign-mode").val(t.CampaignMode), n.getPlayerData())
		},
		n.filterSettingsAreDifferent = function (n) {
			return $("#tray-leaderboard-type").val() !== n.Leaderboard || $("#tray-difficulty").val() !== n.Difficulty || $("#tray-game").val() !== n.Game || $("#tray-mission-id").val() !== n.MissionId || $("#tray-leaderboard-stat").val() !== n.Stat || $("#tray-campaign-mode").val() !== n.CampaignMode
		},
		n.saveFilterSettings = function () {
			if (Modernizr.localstorage) {
				var t = {
					Leaderboard : $("#tray-leaderboard-type").val(),
					Difficulty : $("#tray-difficulty").val(),
					Game : $("#tray-game").val(),
					MissionId : $("#tray-mission-id").val(),
					Stat : $("#tray-leaderboard-stat").val(),
					CampaignMode : $("#tray-campaign-mode").val()
				};
				localStorage.setItem(n.storagePrefix, JSON.stringify(t))
			}
		},
		n.findFilterSettings = function () {
			if (!Modernizr.localstorage)
				return null;
			var t = localStorage.getItem(n.storagePrefix);
			return Utilities.Is.NullOrUndefined(t) ? null : JSON.parse(t)
		},
		n.$legend = $(".mcc-stats--campaign-mission-leaderboards-legend"),
		n.selectors = {
			filterSubmit : ".tray-container--halomasterchiefcollection-campaign-leaderboards button[name='confirm']",
			filterGameDropdown : "#tray-game",
			filterMissionDropdown : "#tray-mission-id",
			filterCampaignMode : "#tray-campaign-mode",
			playerRow : ".tr.player",
			topXGlobalRow : "header.topXGlobal",
			gamertagAnchor : ".gamertag a.case-sensitive",
			filterToggle : ".tray-container--halomasterchiefcollection-campaign-leaderboards .tray-toggle",
			noData : ".no-data",
			fetchingData : ".fetching-data"
		},
		n.templates = {
			playerRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-8 gamertag"><a href="" class="case-sensitive"><\/a><\/div><div class="td span-2 stat-score highlighted-stat"><\/div><div class="td span-2 stat-time secondary-stat"><\/div><\/div><\/div>',
			checkpointBreakdownTable : '<div class="table mcc-stats mcc-stats--checkpoints"><\/div>',
			checkpointBreakdownHeader : '<header class="td-g desktop"><div class="td span-8 text--medium checkpoint-title"><\/div><div class="td span-2 text--smallest stat-score highlighted-stat"><\/div><div class="td span-2 text--smallest stat-time secondary-stat"><\/div><\/header><header class="td-g mobile"><div class="td span-6 text--medium checkpoint-title"><\/div><div class="td span-6 text--smallest"><span class="stat-score highlighted-stat-marker"><\/span> /<br /><span class="stat-time secondary-stat-marker"><\/span><\/div><\/header>',
			checkpointBreakdownRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-8 gamertag"><a class="case-sensitive"><\/a><\/div><div class="td span-2 stat-score highlighted-stat"><\/div><div class="td span-2 stat-time secondary-stat"><\/div><\/div><\/div>'
		},
		n.leaderboardStat = "Score",
		n.storagePrefix = "mcc_ml_" + n.findCurrentUserGamertag(),
		n
	}
	(),
	r = function () {
		function n() {}

		return n.init = function () {
			n.$table.length !== 0 && n.attachEvents()
		},
		n.initPlaylistData = function (t) {
			n.playlistData = t;
			n.updateCheckpointBreakdown();
			n.applyFilterSettings()
		},
		n.initLeaderboard = function (t, i) {
			n.leaderboard = i;
			n.leaderboardStat = t;
			n.updatePlayerStats();
			n.updateChart();
			n.updateLegendHeader();
			n.updateCheckpointBreakdown();
			n.showFilterSettingsOnFirstVisit()
		},
		n.showFilterSettingsOnFirstVisit = function () {
			Utilities.Is.NullOrUndefined(localStorage.getItem(n.localStorageKey)) && Utilities.Tray.open($(n.selectors.filterToggle))
		},
		n.findCurrentUserGamertag = function () {
			return n.$table.data("current-user-gamertag")
		},
		n.attachEvents = function () {
			$(n.selectors.filterConfirm).on("click", n.submitFilter);
			$(n.selectors.filterGame).on("change", n.currentGameChanged)
		},
		n.currentGameChanged = function () {
			var i,
			r,
			t;
			if (!Utilities.Is.NullOrUndefined(n.playlistData))
				for (i = $(n.selectors.filterGame).val(), r = $(n.selectors.filterPlaylist), r.find("option").remove(), t = 0; t < n.playlistData[i].length; t++)
					r.append('<option value="' + n.playlistData[i][t].PlaylistId + '">' + n.playlistData[i][t].PlaylistName + "<\/option>")
		},
		n.submitFilter = function (t) {
			t.preventDefault();
			n.getPlayerData()
		},
		n.getPlayerData = function () {
			var i = $(n.selectors.filterConfirm),
			r,
			t;
			$(n.selectors.fetchingData).removeClass("hide");
			$(n.selectors.noData).addClass("hide");
			r = n.createStatsUri();
			t = new Utilities.Ajax(r, "GET");
			t.cache = !1;
			t.successFunc = function (t) {
				n.leaderboard = t;
				n.leaderboardStat = $("#tray-leaderboard-stat").val();
				n.updatePlayerStats();
				n.updateStatsLabels();
				n.updateChart();
				n.updateLegendHeader();
				n.updateCheckpointBreakdown();
				n.saveFilterSettings();
				Halo.UI.InputControls.Button.endWaiting(i);
				Utilities.Tray.close();
				$(n.selectors.fetchingData).addClass("hide")
			};
			t.errorFunc = function () {
				Halo.UI.InputControls.Button.endWaiting(i);
				$(n.selectors.fetchingData).addClass("hide")
			};
			t.execute()
		},
		n.updateStatsLabels = function () {
			$("#display-playlist-title").text($("#tray-playlist-id option:selected").text());
			$("#display-leaderboard-type").text($("#tray-leaderboard-type option:selected").text());
			$("#display-leaderboard-stat-title").text($("#tray-leaderboard-stat option:selected").text())
		},
		n.isCurrentUserAvailable = function () {
			if (Utilities.Is.NullOrUndefined(n.leaderboard.CurrentUser))
				return !1;
			for (var t = 0; t < n.leaderboard.LeaderboardUsers.length; t++)
				if (!Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[t]) && n.leaderboard.LeaderboardUsers[t].Gamertag === n.leaderboard.CurrentUser.Gamertag)
					return !1;
			return !0
		},
		n.updatePlayerStats = function () {
			var r,
			u,
			f,
			t,
			i;
			n.$table.find(n.selectors.playerRow + "," + n.selectors.topXGlobalRow).remove();
			n.isCurrentUserAvailable() && (r = $(n.templates.playerRow), r.addClass("me").find(n.selectors.gamertagAnchor).text(n.leaderboard.CurrentUser.Gamertag).attr("href", n.$table.data("check-gamertag-route").replace("gamertag", n.leaderboard.CurrentUser.Gamertag)), n.$table.append(r), n.leaderboard.LeaderboardUsers.length > 0 && (u = n.$table.data("top-x-global").replace("{0}", n.leaderboard.LeaderboardUsers.length), f = $('<header class="td-g desktop topXGlobal"><div class="td span-12 text--medium">' + u + "<\/div><\/header>"), n.$table.append(f)));
			for (t in n.leaderboard.LeaderboardUsers)
				Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[t]) || (i = $(n.templates.playerRow), i.find(n.selectors.gamertagAnchor).text(n.leaderboard.LeaderboardUsers[t].Gamertag).attr("href", n.$table.data("check-gamertag-route").replace("gamertag", n.leaderboard.LeaderboardUsers[t].Gamertag)), n.leaderboard.LeaderboardUsers[t].Gamertag === n.findCurrentUserGamertag() && i.addClass("me"), n.$table.append(i));
			n.$table.find(n.selectors.gamertagAnchor).each(function () {
				var i = $(this),
				r = i.closest(".tr.player"),
				t = n.findLeaderboardUser(i.text());
				if (Utilities.Is.NullOrUndefined(t))
					return !1;
				i.attr("href", n.$table.data("check-gamertag-route").replace("gamertag", t.Gamertag)).text(t.Gamertag);
				r.find(".stat-score").text(t.BestScore);
				r.find(".stat-time").text(Utilities.DateTime.formatTimeSpan(t.BestTime))
			});
			n.$table.find(n.selectors.playerRow).length === 0 ? n.$table.addClass("hide") : n.$table.removeClass("hide");
			n.setScoreAndTimeClasses(n.$table.find(".stat-score"), n.$table.find(".stat-time"))
		},
		n.createStatsUri = function () {
			var t = n.$table.data("stats-route");
			return t = Utilities.Main.replaceUriSegment(t, "/score", "/" + $("#tray-leaderboard-stat").val().toLowerCase()),
			t = Utilities.Main.replaceUriSegment(t, "playlistId=0", "playlistId=" + $("#tray-playlist-id").val()),
			Utilities.Main.replaceUriSegment(t, "type=Friends", "type=" + $("#tray-leaderboard-type").val())
		},
		n.findLeaderboardUser = function (t) {
			for (var i = 0; i < n.leaderboard.LeaderboardUsers.length; i++)
				if (!Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[i]) && n.leaderboard.LeaderboardUsers[i].Gamertag === t)
					return n.leaderboard.LeaderboardUsers[i];
			return n.leaderboard.CurrentUser.Gamertag === t ? n.leaderboard.CurrentUser : null
		},
		n.findCurrentPlaylistMaps = function () {
			var i = $(n.selectors.filterGame).val(),
			r = $(n.selectors.filterPlaylist).val(),
			t;
			if (Utilities.Is.NullOrUndefined(n.playlistData) || Utilities.Is.NullOrUndefined(n.playlistData[i]))
				return null;
			for (t = 0; t < n.playlistData[i].length; t++)
				if (n.playlistData[i][t].PlaylistId === r)
					return n.playlistData[i][t].Maps;
			return null
		},
		n.updateLegendHeader = function () {
			var t = n.$table.find("header .stat-score"),
			i = n.$table.find("header .stat-time");
			n.setScoreAndTimeClasses(t, i)
		},
		n.setScoreAndTimeClasses = function (t, i) {
			n.isScoreStatSelected() ? (t.addClass("highlighted-stat").removeClass("secondary-stat"), i.removeClass("highlighted-stat").addClass("secondary-stat")) : (t.removeClass("highlighted-stat").addClass("secondary-stat"), i.addClass("highlighted-stat").removeClass("secondary-stat"))
		},
		n.updateChart = function () {
			for (var h, s, t = [], i = [], u = [], c = n.$table.find(n.selectors.playerRow), f = n.findMaxSegmentCount(), e = !1, r = [], o = 0; o < f; o++)
				r.push(null), u.push(o + 1);
			c.each(function (u, o) {
				var g = $(o),
				v = g.find(n.selectors.gamertagAnchor).text(),
				k = !0,
				d = !0,
				s,
				h,
				y,
				c,
				p,
				l,
				w,
				a,
				b;
				if (Utilities.Is.NullOrUndefined(v) || v.length === 0)
					t.push(r), i.push(r);
				else {
					if (s = n.findLeaderboardUser(v), Utilities.Is.NullOrUndefined(s)) {
						t.push(r);
						i.push(r);
						return
					}
					if (s.ScorePerMission.length === 0 && (t.push(r), k = !1), s.TimePerMission.length === 0 && (i.push(r), d = !1), k) {
						for (h = [], y = 0, c = 0; c < s.ScorePerMission.length; c++) {
							if (Utilities.Is.NullOrUndefined(s.ScorePerMission[c])) {
								h.push(null);
								continue
							}
							h.push(s.ScorePerMission[c]);
							y++;
							e = !0
						}
						for (p = y; p < f; p++)
							h.push(null);
						t.push(h)
					}
					if (d) {
						for (l = [], w = 0, a = 0; a < s.TimePerMission.length; a++) {
							if (Utilities.Is.NullOrUndefined(s.TimePerMission[a])) {
								l.push(null);
								continue
							}
							l.push(s.TimePerMission[a]);
							w++;
							e = !0
						}
						for (b = w; b < f; b++)
							l.push(null);
						i.push(l)
					}
				}
			});
			e ? $(n.selectors.noData).addClass("hide") : $(n.selectors.noData).removeClass("hide");
			h = $(".chart.chart--line:first");
			s = null;
			n.isScoreStatSelected() || (s = {
					axisY : {
						labelInterpolationFnc : MasterChart.timespan
					}
				});
			u.length === 0 && (u = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n.isScoreStatSelected() && t.length === 0 && (t = [[null, null, null, null, null, null, null, null, null, null]]), n.isScoreStatSelected() || i.length !== 0 || (i = [[null, null, null, null, null, null, null, null, null, null]]));
			h.get(0).masterChart.update(s, {
				labels : u,
				series : n.isScoreStatSelected() ? t : i
			})
		},
		n.findMaxSegmentCount = function () {
			for (var t = 0, i = 0; i < n.leaderboard.LeaderboardUsers.length; i++)
				Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[i]) || (n.isScoreStatSelected() ? n.leaderboard.LeaderboardUsers[i].ScorePerMission.length > t && (t = n.leaderboard.LeaderboardUsers[i].ScorePerMission.length) : n.leaderboard.LeaderboardUsers[i].TimePerMission.length > t && (t = n.leaderboard.LeaderboardUsers[i].TimePerMission.length));
			return Utilities.Is.NullOrUndefined(n.leaderboard.CurrentUser) || (n.isScoreStatSelected() ? n.leaderboard.CurrentUser.ScorePerMission.length > t && (t = n.leaderboard.CurrentUser.ScorePerMission.length) : n.leaderboard.CurrentUser.TimePerMission.length > t && (t = n.leaderboard.CurrentUser.TimePerMission.length)),
			t
		},
		n.updateCheckpointBreakdown = function () {
			var i = $(".checkpoint-breakdown"),
			o,
			u,
			t,
			h,
			r;
			for (i.find(".table.mcc-stats--checkpoints").remove(), o = n.findMaxSegmentCount(), u = n.findCurrentPlaylistMaps(), t = 0; t < o; t++) {
				var f = $(n.templates.checkpointBreakdownTable),
				e = $(n.templates.checkpointBreakdownHeader),
				s = n.$table.data("checkpoint-format").replace("{0}", t + 1);
				for (!Utilities.Is.NullOrUndefined(u) && u.length >= t && (s += " - " + u[t].MapName), e.find(".checkpoint-title").text(s), e.find(".stat-score").text(n.$table.data("highest-score")), e.find(".stat-time").text(n.$table.data("fastest-time")), f.append(e), n.isCurrentUserAvailable() && (h = n.createPlayerRowForCheckpointBreakdown(n.leaderboard.CurrentUser, t), f.append(h)), r = 0; r < n.leaderboard.LeaderboardUsers.length; r++)
					Utilities.Is.NullOrUndefined(n.leaderboard.LeaderboardUsers[r]) || f.append(n.createPlayerRowForCheckpointBreakdown(n.leaderboard.LeaderboardUsers[r], t));
				i.find("> .content").append(f)
			}
			o === 0 ? i.addClass("hide") : (n.setScoreAndTimeClasses(i.find(".stat-score"), i.find(".stat-time")), i.removeClass("hide"))
		},
		n.createPlayerRowForCheckpointBreakdown = function (t, i) {
			var r = $(n.templates.checkpointBreakdownRow),
			u,
			f;
			return r.find(n.selectors.gamertagAnchor).text(t.Gamertag).attr("href", n.$table.data("check-gamertag-route").replace("gamertag", t.Gamertag)),
			u = t.ScorePerMission.length >= i - 1 && !Utilities.Is.NullOrUndefined(t.ScorePerMission[i]) ? t.ScorePerMission[i].toString() : "--",
			r.find(".stat-score").text(u),
			f = t.TimePerMission.length >= i - 1 && !Utilities.Is.NullOrUndefined(t.TimePerMission[i]) ? Utilities.DateTime.formatTimeSpan(t.TimePerMission[i]) : "--",
			r.find(".stat-time").text(f),
			t.Gamertag === n.findCurrentUserGamertag() && r.addClass("me"),
			r
		},
		n.isScoreStatSelected = function () {
			return n.leaderboardStat === "Score"
		},
		n.applyFilterSettings = function () {
			var t = n.findFilterSettings();
			!Utilities.Is.NullOrUndefined(t) && n.isFilterDataDifferent(t) && ($("#tray-leaderboard-type").val(t.Leaderboard), $("#tray-game").val(t.Game), n.currentGameChanged(), $("#tray-playlist-id").val(t.PlaylistId), $("#tray-leaderboard-stat").val(t.Stat), n.getPlayerData())
		},
		n.isFilterDataDifferent = function (n) {
			return $("#tray-leaderboard-type").val() !== n.Leaderboard || $("#tray-game").val() !== n.Game || $("#tray-playlist-id").val() !== n.PlaylistId || $("#tray-leaderboard-stat").val() !== n.Stat
		},
		n.saveFilterSettings = function () {
			if (Modernizr.localstorage) {
				var t = {
					Leaderboard : $("#tray-leaderboard-type").val(),
					Game : $("#tray-game").val(),
					PlaylistId : $("#tray-playlist-id").val(),
					Stat : $("#tray-leaderboard-stat").val()
				};
				localStorage.setItem(n.localStorageKey, JSON.stringify(t))
			}
		},
		n.findFilterSettings = function () {
			if (!Modernizr.localstorage)
				return null;
			var t = localStorage.getItem(n.localStorageKey);
			return Utilities.Is.NullOrUndefined(t) ? null : JSON.parse(t)
		},
		n.$table = $(".mcc-stats--campaign-playlist-leaderboards-legend"),
		n.selectors = {
			topXGlobalRow : "header.topXGlobal",
			filterToggle : ".tray-container--halomasterchiefcollection-campaign-leaderboards .tray-toggle",
			filterGame : "#tray-game",
			filterPlaylist : "#tray-playlist-id",
			filterConfirm : ".tray-container--halomasterchiefcollection-campaign-leaderboards button[name='confirm']",
			noData : ".no-data",
			fetchingData : ".fetching-data",
			playerRow : ".tr.player",
			gamertagAnchor : ".gamertag a.case-sensitive"
		},
		n.templates = {
			checkpointBreakdownTable : '<div class="table mcc-stats mcc-stats--checkpoints"><\/div>',
			checkpointBreakdownHeader : '<header class="td-g desktop"><div class="td span-8 text--medium checkpoint-title"><\/div><div class="td span-2 text--smallest stat-score highlighted-stat"><\/div><div class="td span-2 text--smallest stat-time secondary-stat"><\/div><\/header><header class="td-g mobile"><div class="td span-6 text--medium checkpoint-title"><\/div><div class="td span-6 text--smallest"><span class="stat-score highlighted-stat-marker"><\/span> /<br /><span class="stat-time secondary-stat-marker"><\/span><\/div><\/header>',
			checkpointBreakdownRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-8 gamertag"><a class="case-sensitive"><\/a><\/div><div class="td span-2 stat-score highlighted-stat"><\/div><div class="td span-2 stat-time secondary-stat"><\/div><\/div><\/div>',
			playerRow : '<div class="tr player text--medium"><div class="td-g"><div class="td span-8 gamertag"><a href="" class="case-sensitive"><\/a><\/div><div class="td span-2 stat-score highlighted-stat"><\/div><div class="td span-2 stat-time secondary-stat"><\/div><\/div><\/div>'
		},
		n.leaderboardStat = "Score",
		n.localStorageKey = "mcc_pl_" + n.findCurrentUserGamertag(),
		n
	}
	(),
	c = function () {
		function n() {}

		return n.init = function () {
			var i;
			if (n.$arena = $(".halo5-sr-arena"), n.$arena.length !== 0) {
				t.initStatToggles(n.$arena.find(".gametypes"));
				t.initOnTrendChange();
				i = n.$arena.find(".playlists");
				n.$playlistsContent = i.find(".playlists-content");
				var r = i.find("nav"),
				e = r.find("ul a"),
				f = 0;
				e.on("click", function () {
					var t = $(this),
					h,
					o,
					s;
					if (t.hasClass("selected")) {
						r.trigger("click");
						return
					}
					e.removeClass("selected");
					t.addClass("selected");
					h = t.closest("nav");
					o = t.text();
					h.find("> a").text(o);
					r.trigger("click");
					s = new Utilities.Ajax(t.attr("data-route"), "GET");
					s.successFunc = function (t) {
						f-- > 1 || (n.$playlistsContent.html(t), u.initDetailedTables(i.find(".table")), n.hookUpPlaylistsViewMore(), DataVis.draw())
					};
					s.errorCallback = function () {
						if (!(f-- > 1)) {
							var t = n.$playlistsContent.find(".loader");
							t.find(".spinner").remove();
							t.find(".loading-text").text(Halo.Resources.Strings.failed_to_load_playlist.replace("{0}", o))
						}
					};
					n.$playlistsContent.html('<div class="loader"><span class="spinner text--large"><\/span><div class="loading-text text--small">' + Halo.Resources.Strings.loading_message.replace("{0}", o) + "<\/div><\/div>");
					++f;
					s.execute()
				});
				n.hookUpPlaylistsViewMore()
			}
		},
		n.hookUpPlaylistsViewMore = function () {
			var t = n.$playlistsContent.find(".view-more"),
			i = n.$playlistsContent.find(".tr");
			t.on("click", function () {
				t.hide();
				i.addClass("show")
			})
		},
		n
	}
	(),
	l = function () {
		function n() {}

		return n.init = function () {
			var n = $(".halo5-sr-warzone");
			if (n.length !== 0) {
				var i = n.find(".scenario"),
				r = n.find(".variant-selection"),
				s = r.find("> a"),
				e = r.find("ul a"),
				u = n.find(".map-selection"),
				o = u.find("> a"),
				f = u.find("ul a");
				e.on("click", function (n) {
					var u,
					h,
					t,
					c;
					if (n.preventDefault(), u = $(this), u.hasClass("selected")) {
						r.trigger("click");
						return
					}
					h = u.attr("data-variant-id");
					f.removeClass("selected");
					t = null;
					$.each(f, function (n, i) {
						var r = $(i);
						r.attr("data-variant-id") === h ? (t === null && (t = r), r.show()) : r.hide()
					});
					t.addClass("selected");
					o.text(t.text());
					c = i.filter(function () {
							return $(this).attr("data-variant-id") === h && $(this).attr("data-map-id") === t.attr("data-map-id")
						});
					i.removeClass("show");
					c.addClass("show");
					s.text(u.text());
					e.removeClass("selected");
					r.trigger("click");
					DataVis.draw()
				});
				f.on("click", function (n) {
					var t;
					if (n.preventDefault(), t = $(this), t.hasClass("selected")) {
						u.trigger("click");
						return
					}
					var r = t.attr("data-variant-id"),
					e = t.attr("data-map-id"),
					s = i.filter(function () {
							return $(this).attr("data-variant-id") === r && $(this).attr("data-map-id") === e
						});
					i.removeClass("show");
					s.addClass("show");
					o.text(t.text());
					f.removeClass("selected");
					u.trigger("click");
					DataVis.draw()
				});
				t.initOnTrendChange()
			}
		},
		n
	}
	(),
	a = function () {
		function n() {}

		return n.init = function () {
			var n = $(".halo5-commendation-category"),
			t;
			if (n.length !== 0) {
				t = n.find(".expand-masteries");
				t.on("click", function (i) {
					i.preventDefault();
					n.find(".masteries .row").addClass("show");
					t.hide();
					DataVis.draw()
				})
			}
		},
		n
	}
	()
})(Games || (Games = {}));
$(document).ready(Games.Main.init), function (n) {
	var i = function () {
		function n() {}

		return n.init = function () {
			r.init();
			u.init();
			f.init()
		},
		n
	}
	(),
	t;
	n.Main = i;
	t = function () {
		function n() {}

		return n.addToPackCount = function (n) {
			var t = $(".hero .unopened-packs-link"),
			i,
			r;
			t.length > 0 && (i = t.text().match(/\d+/), i && (r = parseInt(i[0], 10), t.text(Halo.Resources.Strings.req_nav_unopenedpacks.replace("{0}", (r + n).toString(10)))))
		},
		n.viewReq = function (n, t) {
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
				u = $('<button class="button" data-analytics="{pageName}:SellBack">' + Halo.Resources.Strings.sell_back + "<\/button>");
				u.on("click", function () {
					var t = new Utilities.Dialog({
							title : Halo.Resources.Strings.sell_card,
							content : Halo.Resources.Strings.sell_req_prompt.replace("{0}", n.name).replace("{1}", n.sellPrice),
							buttons : [{
									text : Halo.Resources.Strings.yes,
									analytics : "{pageName}:SellBack/Yes",
									handler : function (u) {
										var f = new Utilities.Ajax(n.sellUrl, "POST");
										f.dataBody = {
											RequisitionId : n.id,
											ExpectedSellPrice : n.sellPrice
										};
										f.successFunc = function (f) {
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
													t.hide()
												}), o = $(".halo5-reqs .credit-balance .value"), o.text(parseInt(o.text(), 10) + parseInt(f.SoldPrice, 10)), n.unusedCount -= 1, n.unusedCount <= 0 && i.hide(), c.text(Halo.Resources.Strings.x_count.replace("{0}", n.unusedCount)), e.attr("data-unused-count", n.unusedCount), e.length === 0 && (s = $(".opened-pack .req.selected"), h = $('.opened-pack .req[data-id="' + n.id + '"]'), s.length !== 0 ? s.remove() : h.first().remove(), h.attr("data-unused-count", n.unusedCount)), t.hide())
										};
										f.errorCallback = function () {
											Halo.UI.InputControls.Button.showError($(u.delegateTarget))
										};
										f.execute()
									},
									enableThrobber : !0
								}, {
									text : Halo.Resources.Strings.no,
									analytics : "{pageName}:SellBack/No",
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
		},
		n.showOpenedPack = function (t, i, r) {
			function c(t, r) {
				t.on("click", function () {
					var f = t.closest(".req");
					u.find(".req").removeClass("selected");
					f.addClass("selected");
					n.viewReq({
						id : r.Metadata.Id,
						name : r.Metadata.Name,
						description : r.Metadata.Description,
						image : r.Metadata.LargeImageUrl,
						sellPrice : parseInt(r.Metadata.SellPrice, 10),
						isWearable : r.Metadata.IsWearable,
						wearableId : r.WearableId,
						subcategory : r.Metadata.InternalSubcategoryName,
						haveOwned : !0,
						unusedCount : f.attr("data-unused-count") || r.UnusedCount,
						hasCertification : r.HasCertification,
						isDurable : r.Metadata.UseType == 2,
						sellUrl : i,
						rarity : r.Metadata.Rarity,
						rarityType : r.Metadata.RarityType,
						energyLevel : r.Metadata.LevelRequirement
					}, function () {
						$(".opened-pack .req").length === 0 && s.hide()
					})
				})
			}
			var u,
			h,
			f,
			e,
			o,
			s;
			for (n.addToPackCount(-1), u = $('<div><ul class="opened-pack media-set col-6"><\/ul><p>' + Halo.Resources.Strings.open_pack_disclaimer + "<\/p><\/div>"), h = u.find(".opened-pack"), f = 0; f < t.length; ++f)
				e = t[f], o = $('<li class="media-item req" data-id="' + e.Metadata.Id + '"><button data-analytics="{pageName}:ViewReqCard"><img src="' + e.Metadata.LargeImageUrl + '" alt="" /><\/button><\/li>'), c(o, e), h.append(o);
			s = new Utilities.Dialog({
					title : Halo.Resources.Strings.pack_contents,
					content : u,
					callback : function () {
						r && r()
					}
				});
			Confetti.confetti({
				particleSize : Math.floor(11520 / window.innerWidth),
				numParticles : Math.floor(window.innerWidth / 3.84)
			});
			s.show()
		},
		n
	}
	();
	n.Helpers = t;
	var r = function () {
		function n() {}

		return n.init = function () {
			var n = $(".halo5-reqs.req-collection");
			if (n.length !== 0) {
				var r = n.find(".reqs-row button"),
				u = n.find(".view-more"),
				i = function () {
					var t = $(window).scrollTop(),
					i = t + $(window).height();
					n.find(".reqs-row img[data-src]:visible").each(function () {
						var n = $(this),
						u = n.offset().top,
						f = u + n.height(),
						r;
						u < i && f > t && (r = n.attr("data-src"), n.attr("src", r).data("src", r).removeAttr("data-src"))
					})
				};
				i();
				$(window).on("scroll resize", i);
				r.on("click", function () {
					var i = $(this),
					r = {
						id : i.attr("data-id"),
						name : i.attr("data-name"),
						description : i.attr("data-description"),
						image : i.find("img").data("src"),
						sellPrice : parseInt(i.attr("data-sell-price"), 10),
						isWearable : i.attr("data-is-wearable").toLowerCase() === "true",
						wearableId : i.attr("data-wearable-id"),
						subcategory : i.attr("data-subcategory"),
						haveOwned : i.attr("data-have-owned").toLowerCase() === "true",
						unusedCount : i.attr("data-unused-count"),
						hasCertification : i.attr("data-has-certification").toLowerCase() === "true",
						isDurable : i.attr("data-is-durable").toLowerCase() === "true",
						sellUrl : n.attr("data-sellurl"),
						rarity : i.attr("data-rarity"),
						rarityType : i.attr("data-rarity-type"),
						energyLevel : i.attr("data-energy-level")
					};
					t.viewReq(r)
				});
				u.on("click", function () {
					var t = $(this),
					n = t.closest(".req-category"),
					r = n.find(".reqs-row:not(.always-show)");
					n.hasClass("expanded") ? (r.removeClass("show"), n.removeClass("expanded"), t.text(Halo.Resources.Strings.view_more_expand.replace("{0}", n.find(".card").length.toString())), n.siblings(".category-name").get(0).scrollIntoView()) : (r.addClass("show"), n.addClass("expanded"), i(), t.text(Halo.Resources.Strings.view_less))
				})
			}
		},
		n
	}
	(),
	u = function () {
		function n() {}

		return n.init = function () {
			if (n.$page = $(".halo5-reqs.req-store"), n.$page.length !== 0) {
				var t = n.$page.find("button");
				t.on("click", function () {
					n.openBuyDialog(JSON.parse($(this).closest(".pack").attr("data-pack")))
				})
			}
		},
		n.openBuyDialog = function (i) {
			var c = n.$page.attr("data-buyurl"),
			y = n.$page.attr("data-sellurl"),
			s = n.$page.attr("data-openurl"),
			p = n.$page.attr("data-unopenedpacksurl"),
			o,
			r,
			f,
			a,
			v;
			if (c) {
				var h = $(".halo5-reqs.req-store .credit-balance .value"),
				u = parseInt(h.text(), 10),
				l = $('<div class="card"><img src="' + i.LargeImageUrl + '" alt="" /><\/div><div class="info"><div class="text--large">' + i.Name + "<\/div><p>" + i.Description + "<\/p><\/div>"),
				e = $(l[1]);
				if (i.IsPurchasableWithCredits) {
					o = u >= i.CreditPrice;
					r = $('<div><img class="credit-icon" src="' + (o ? Halo.Resources.Uris.halo5CreditBalanceIconUri : Halo.Resources.Uris.halo5CreditBalanceInadequateIconUri) + '" /><div class="numeric--medium">' + i.CreditPrice + '<\/div><div class="text--smallest">' + Halo.Resources.Strings.req_points + "<\/div><\/div>");
					o || r.addClass("not-enough-credits");
					e.append(r);
					f = $('<button class="button" ' + (o ? "" : "disabled") + ' data-analytics="{pageName}:BuyWithReqPointsPopup">' + Halo.Resources.Strings.buy_with_req_points + "<\/button>");
					f.on("click", function () {
						var n = new Utilities.Dialog({
								title : Halo.Resources.Strings.purchase_confirmation,
								content : Halo.Resources.Strings.buy_pack_prompt.replace("{0}", i.Name).replace("{1}", i.CreditPrice),
								buttons : [{
										text : Halo.Resources.Strings.yes,
										analytics : "{pageName}:BuyWithReqPointsPopup/Yes",
										handler : function (e) {
											var o = new Utilities.Ajax(c, "POST");
											o.dataBody = {
												RequisitionPackId : i.Id,
												ExpectedPrice : i.CreditPrice
											};
											o.successFunc = function (o) {
												var c,
												l;
												if (t.addToPackCount(i.IsStack ? i.StackCount : 1), u -= i.CreditPrice, h.text(u), u < i.CreditPrice && (r.find("img").attr("src", Halo.Resources.Uris.halo5CreditBalanceInadequateIconUri), r.addClass("not-enough-credits"), f.prop("disabled", !0)), s)
													n.hide();
												else {
													Halo.UI.InputControls.Button.showSuccess($(e.delegateTarget), function () {
														n.hide()
													});
													return
												}
												i.IsStack ? (l = new Utilities.Dialog({
															title : Halo.Resources.Strings.purchase_confirmed,
															content : Halo.Resources.Strings.purchased_pack_prompt.replace("{0}", i.Name),
															buttons : [{
																	text : Halo.Resources.Strings.view_unopened_packs,
																	analytics : "{pageName}:BuyWithReqPointsPopup/Success/ViewUnopenedPacks",
																	action : p
																}, {
																	text : Halo.Resources.Strings.action_close,
																	analytics : "{pageName}:BuyWithReqPointsPopup/Success/Close",
																	action : 0
																}
															],
															size : 1
														}), l.show()) : (c = new Utilities.Dialog({
															title : Halo.Resources.Strings.purchase_confirmed,
															content : Halo.Resources.Strings.purchased_pack_prompt.replace("{0}", i.Name),
															buttons : [{
																	text : Halo.Resources.Strings.open_pack,
																	analytics : "{pageName}:BuyWithReqPointsPopup/Success/OpenPack",
																	handler : function (n) {
																		if (s !== "") {
																			var e = new Utilities.Ajax(s, "POST");
																			e.dataBody = {
																				RequisitionPackId : i.Id,
																				InstanceId : o.InstanceId
																			};
																			e.successFunc = function (n) {
																				c.hide();
																				t.showOpenedPack(n.Cards, y, function () {
																					u = parseInt(h.text(), 10);
																					u >= i.CreditPrice && (r.find("img").attr("src", Halo.Resources.Uris.halo5CreditBalanceIconUri), r.removeClass("not-enough-credits"), f.prop("disabled", !1))
																				})
																			};
																			e.errorCallback = function () {
																				Halo.UI.InputControls.Button.showError($(n.delegateTarget))
																			};
																			e.execute()
																		}
																	},
																	enableThrobber : !0
																}, {
																	text : Halo.Resources.Strings.action_close,
																	analytics : "{pageName}:BuyWithReqPointsPopup/Success/Close",
																	action : 0
																}
															],
															size : 1
														}), c.show())
											};
											o.errorCallback = function () {
												Halo.UI.InputControls.Button.showError($(e.delegateTarget))
											};
											o.execute()
										},
										enableThrobber : !0
									}, {
										text : Halo.Resources.Strings.no,
										analytics : "{pageName}:BuyWithReqPointsPopup/No",
										action : 0
									}
								],
								size : 1
							});
						n.show()
					});
					e.append(f)
				}
				i.IsPurchasableFromMarketplace && (a = $('<div class="numeric--medium">' + i.MarketplaceSalesPrice + "<\/div>"), e.append(a), v = $('<a class="button" href="' + i.MarketplaceProductUrl + '" target="_blank" data-analytics="{pageName}:BuyFromXbox">' + Halo.Resources.Strings.buy_from_xbox + "<\/button>"), e.append(v));
				new Utilities.Dialog({
					content : l,
					cssClass : "req-popup",
					size : 1
				}).show()
			}
		},
		n
	}
	(),
	f = function () {
		function n() {}

		return n.init = function () {
			var n = $(".halo5-reqs.req-unopened"),
			i;
			if (n.length !== 0) {
				i = n.find(".pack button");
				i.on("click", function () {
					var i = $(this).closest(".pack"),
					u = n.attr("data-openurl"),
					f = n.attr("data-sellurl"),
					r;
					i.hasClass("opened") || u && (r = new Utilities.Dialog({
								title : Halo.Resources.Strings.open_pack,
								content : Halo.Resources.Strings.open_pack_prompt.replace("{0}", i.attr("data-name")),
								buttons : [{
										text : Halo.Resources.Strings.yes,
										analytics : "{pageName}:OpenPackPopup/Yes",
										handler : function (n) {
											var o = i.attr("data-pack-id"),
											s = i.attr("data-instance-id"),
											e = new Utilities.Ajax(u, "POST");
											e.dataBody = {
												RequisitionPackId : o,
												InstanceId : s
											};
											e.successFunc = function (n) {
												r.hide();
												i.addClass("opened");
												t.showOpenedPack(n.Cards, f)
											};
											e.errorCallback = function () {
												Halo.UI.InputControls.Button.showError($(n.delegateTarget))
											};
											e.execute()
										},
										enableThrobber : !0
									}, {
										text : Halo.Resources.Strings.no,
										analytics : "{pageName}:OpenPackPopup/No",
										action : 0
									}
								],
								size : 1
							}), r.show())
				})
			}
		},
		n
	}
	()
}
(Halo5Requisitions || (Halo5Requisitions = {}));
MasterChart = {};
MasterChart.version = "0.117", function (n, t, i) {
	"use strict";
	i.noop = function (n) {
		return n
	};
	i.alphaNumerate = function (n) {
		return String.fromCharCode(97 + n % 26)
	};
	i.timespan = function (n) {
		var t,
		i,
		r,
		u;
		return n === null || n === undefined ? "" : (t = function (n) {
			return n < 10 ? "0" + n : n.toString()
		}, i = Math.floor(n / 36e5), n -= i * 36e5, r = Math.floor(n / 6e4), n -= r * 6e4, u = Math.floor(n / 1e3), t(i) + ":" + t(r) + ":" + t(u))
	};
	i.extend = function (n, t) {
		n = n || {};
		for (var r in t)
			n[r] = typeof t[r] == "object" ? i.extend(n[r], t[r]) : t[r];
		return n
	};
	i.getHeight = function (n) {
		return n.clientHeight || Math.round(n.getBBox().height) || n.parentNode.clientHeight
	};
	i.getWidth = function (n) {
		return n.clientWidth || Math.round(n.getBBox().width) || n.parentNode.clientWidth
	};
	i.getPixelLength = function (n) {
		return typeof n == "string" && (n = n.replace(/px/i, "")),
		+n
	};
	i.querySelector = function (n) {
		return n instanceof Node ? n : t.querySelector(n)
	};
	i.createSvg = function (n, t, r, u) {
		var f;
		return n.chartistSvg !== undefined ? (f = n.chartistSvg.attr({
					width : t || "100%",
					height : r || "100%"
				}).removeAllClasses().addClass(u), f.empty()) : (f = i.Svg("svg").attr({
					width : t || "100%",
					height : r || "100%"
				}).addClass(u), n.appendChild(f._node), n.chartistSvg = f),
		f
	};
	i.getDataArray = function (n) {
		for (var i = [], t = 0; t < n.series.length; t++)
			i[t] = typeof n.series[t] == "object" && n.series[t].data !== undefined ? n.series[t].data : n.series[t];
		return i
	};
	i.normalizeDataArray = function (n, t) {
		for (var r, i = 0; i < n.length; i++)
			if (n[i].length !== t)
				for (r = n[i].length; r < t; r++)
					n[i][r] = 0;
		return n
	};
	i.orderOfMagnitude = function (n) {
		return Math.floor(Math.log(Math.abs(n)) / Math.LN10)
	};
	i.projectLength = function (n, t, r, u) {
		var f = i.getAvailableHeight(n, u);
		return t / r.range * f
	};
	i.getAvailableHeight = function (n, t) {
		return i.getHeight(n._node) - t.chartPadding * 2 - t.axisX.offset
	};
	i.getHighLow = function (n) {
		for (var i, r = {
				high : -Number.MAX_VALUE,
				low : Number.MAX_VALUE
			}, t = 0; t < n.length; t++)
			for (i = 0; i < n[t].length; i++)
				n[t][i] > r.high && (r.high = n[t][i]), n[t][i] < r.low && (r.low = n[t][i]);
		return r
	};
	i.getBounds = function (n, t, r, u) {
		var e,
		o,
		s,
		f = i.getHighLow(t),
		h;
		for (f.high = r.high || (r.high === 0 ? 0 : f.high), f.low = r.low || (r.low === 0 ? 0 : f.low), f.high === f.low && (f.low === 0 ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high === null && f.low === null ? (f.high = 1, f.low = 0) : f.low = 0), (u || u === 0) && (f.high = Math.max(u, f.high), f.low = Math.min(u, f.low)), f.valueRange = f.high - f.low, f.oom = i.orderOfMagnitude(f.valueRange), f.min = Math.floor(f.low / Math.pow(10, f.oom)) * Math.pow(10, f.oom), f.max = Math.ceil(f.high / Math.pow(10, f.oom)) * Math.pow(10, f.oom), f.range = f.max - f.min, f.step = Math.pow(10, f.oom), f.numberOfSteps = Math.round(f.range / f.step); ; )
			if (h = i.projectLength(n, f.step / 2, f, r), h >= r.axisY.scaleMinSpace)
				f.step /= 2;
			else
				break;
		for (o = f.min, s = f.max, e = f.min; e <= f.max; e += f.step)
			e + f.step < f.low && (o += f.step), e - f.step > f.high && (s -= f.step);
		for (f.min = o, f.max = s, f.range = f.max - f.min, f.values = [], e = f.min; e <= f.max; e += f.step)
			f.values.push(Math.round(e * 100) / 100);
		return f
	};
	i.calculateLabelOffset = function (n, t, i, r, u) {
		for (var e, s, o = 0, f = 0; f < t.length; f++)
			(e = r(t[f], f), e || e === 0) && (s = n.elem("text", {
						dx : 0,
						dy : 0
					}, i).text("" + e), o = Math.max(o, u(s._node)), s.remove());
		return o
	};
	i.polarToCartesian = function (n, t, i, r) {
		var u = (r - 90) * Math.PI / 180;
		return {
			x : n + i * Math.cos(u),
			y : t + i * Math.sin(u)
		}
	};
	i.createChartRect = function (n, t, r, u) {
		return {
			x1 : t.chartPadding + u,
			y1 : (i.getPixelLength(t.height) || i.getHeight(n._node)) - t.chartPadding - r,
			x2 : (i.getPixelLength(t.width) || i.getWidth(n._node)) - t.chartPadding,
			y2 : t.chartPadding,
			width : function () {
				return this.x2 - this.x1
			},
			height : function () {
				return this.y1 - this.y2
			}
		}
	};
	i.percentage = function (n, t) {
		return t * (n / 100)
	};
	i.createAxis = function (n, t, r, u, f, e, o, s) {
		var rt = n.toLowerCase(),
		h = {
			type : {
				upper : rt.toUpperCase(),
				lower : rt,
				reverse : rt === "x" ? {
					upper : "Y",
					lower : "y"
				}
				 : {
					upper : "X",
					lower : "x"
				}
			},
			dir : rt === "x" ? {
				start : "left",
				end : "right",
				left : "top",
				right : "bottom",
				length : "width",
				side : "height",
				direction : "horizontal"
			}
			 : {
				start : "top",
				end : "bottom",
				left : "left",
				right : "right",
				length : "height",
				side : "width",
				direction : "vertical"
			}
		},
		et = {
			axisX : {
				offset : 0,
				showLabel : !0,
				showGrid : !0,
				labelAlign : "top",
				topPadding : 0,
				bottomPadding : 0,
				leftPadding : 0,
				rightPadding : 0,
				extraGridLine : !1,
				labelInterpolationFnc : i.noop
			},
			axisY : {
				offset : 0,
				showLabel : !0,
				showGrid : !0,
				labelAlign : "right",
				topPadding : 0,
				bottomPadding : 0,
				leftPadding : 0,
				rightPadding : 0,
				extraGridLine : !1,
				labelInterpolationFnc : i.noop
			},
			chartPadding : 0,
			classNames : {
				label : "ct-label",
				grid : "ct-grid",
				vertical : "ct-vertical",
				horizontal : "ct-horizontal"
			}
		},
		a,
		g,
		l,
		p,
		b,
		ft,
		k,
		ut,
		c,
		w,
		tt,
		v,
		nt,
		y,
		d,
		it;
		if (o = i.extend(et, o), a = {
				top : i.percentage(o["axis" + h.type.upper].topPadding, t.height()),
				bottom : i.percentage(o["axis" + h.type.upper].bottomPadding, t.height()),
				left : i.percentage(o["axis" + h.type.upper].leftPadding, t.width()),
				right : i.percentage(o["axis" + h.type.upper].rightPadding, t.width())
			}, g = o["axis" + h.type.upper].extraGridLine === !0, o["axis" + h.type.upper].showGrid)
			for (c = 0, w = r.length + (g ? 1 : 0); c < w; c++)
				v = (t[h.dir.length]() - a[h.dir.start] - a[h.dir.end]) / (w - 1), nt = h.type.lower === "x" ? t[h.type.lower + "1"] + a.left + v * c : t[h.type.lower + "1"] - a.bottom - v * c, l = nt, p = Math.round(l), p > l && p - l > .6 ? l = p - 1 + .6 : p <= l && l - p < .4 && (l = p + .4), b = {},
		b[h.type.lower + "1"] = l,
		b[h.type.reverse.lower + "1"] = t[h.type.reverse.lower + "1"],
		b[h.type.lower + "2"] = l,
		b[h.type.reverse.lower + "2"] = t[h.type.reverse.lower + "2"] + a[h.dir.left],
		ft = u.elem("line", b, [o.classNames.grid, o.classNames[h.dir.direction]].join(" ")),
		k = {
			type : "grid",
			axis : h.type.lower,
			index : c,
			group : u,
			element : ft
		},
		k[h.type.lower + "1"] = l,
		k[h.type.reverse.lower + "1"] = t[h.type.reverse.lower + "1"],
		k[h.type.lower + "2"] = l,
		k[h.type.reverse.lower + "2"] = t[h.type.reverse.lower + "2"] + a[h.dir.left],
		s.emit("draw", k);
		if (o["axis" + h.type.upper].showLabel) {
			for (ut = {
					x : 0,
					y : 0
				}, c = 0, w = r.length; c < w; c++) {
				if (tt = o["axis" + h.type.upper].labelInterpolationFnc(r[c], c), !tt && tt !== 0)
					return;
				v = (t[h.dir.length]() - a[h.dir.start] - a[h.dir.end]) / (w - (g ? 0 : 1));
				nt = h.type.lower === "x" ? t[h.type.lower + "1"] + a.left + (g ? v / 2 : 0) + v * c : t[h.type.lower + "1"] - a.bottom - (g ? v / 2 : 0) - v * c;
				y = {};
				y[h.type.lower] = nt + .5;
				y[h.type.reverse.lower] = 0;
				h.type.lower === "y" && (y.x = o.axisY.labelAlign === "right" ? e - o.axisY.offset + o.chartPadding : o.chartPadding);
				d = {};
				h.type.lower === "x" ? d.dx = y.x : (d.dy = nt + 1, d.dx = o.axisY.labelAlign === "right" ? e - o.axisY.offset + o.chartPadding : o.chartPadding, d["text-anchor"] = o.axisY.labelAlign === "right" ? "end" : "start");
				it = f.elem("text", d, [o.classNames.label, o.classNames[h.dir.direction]].join(" ")).text("" + tt);
				h.type.lower === "x" && (y.y = t.y1 + i.getHeight(it._node) + o.axisX.offset, it.attr({
						dy : y.y
					}));
				ut[h.type.lower]++;
				it.addClass(h.type.lower + "-axis-" + ut[h.type.lower]);
				s.emit("draw", {
					type : "label",
					axis : h.type.lower,
					index : c,
					group : f,
					element : it,
					text : "" + tt,
					x : y.x,
					y : y.y,
					space : v
				})
			}
			f.addClass(n + "-axis-" + (Math.floor(r.length / 10) + 1) * 10)
		}
	};
	i.projectPoint = function (n, t, i, r, u) {
		var f = n.x1 + n.width() / (i.length - (u == !0 ? 0 : 1)) * r,
		e = n.y1 - n.height() * (i[r] - t.min) / t.range;
		return {
			x : isNaN(f) ? n.x1 : f,
			y : isNaN(e) ? n.y1 : e
		}
	};
	i.projectAndRotatePoint = function (n, t, i, r, u) {
		var f = n.y2 + n.height() / (i.length - (u == !0 ? 0 : 1)) * r;
		return {
			y : isNaN(f) ? n.y2 : f,
			x : n.x1 + n.width() * (i[r] - t.min) / t.range
		}
	};
	i.optionsProvider = function (t, r, u, f) {
		function s() {
			var r = o,
			t;
			if (o = i.extend({}, l), u)
				for (e = 0; e < u.length; e++)
					t = n.matchMedia(u[e][0]), t.matches && (o = i.extend(o, u[e][1]));
			f && f.emit("optionsChanged", {
				previousOptions : r,
				currentOptions : o
			})
		}
		function a() {
			c.forEach(function (n) {
				n.removeListener(s)
			})
		}
		var l = i.extend(i.extend({}, t), r),
		o,
		c = [],
		e,
		h;
		if (n.matchMedia) {
			if (u)
				for (e = 0; e < u.length; e++)
					h = n.matchMedia(u[e][0]), h.addListener(s), c.push(h)
		} else
			throw "window.matchMedia not found! Make sure you're using a polyfill.";
		return s(), {
			get currentOptions() {
				return i.extend({}, o)
			},
			removeMediaQueryListeners : a
		}
	};
	i.catmullRom2bezier = function (n, t) {
		for (var i, f = [], r = 0, u = n.length; u - 2 * !t > r; r += 2)
			i = [{
					x : +n[r - 2],
					y : +n[r - 1]
				}, {
					x : +n[r],
					y : +n[r + 1]
				}, {
					x : +n[r + 2],
					y : +n[r + 3]
				}, {
					x : +n[r + 4],
					y : +n[r + 5]
				}
			], t ? r ? u - 4 === r ? i[3] = {
				x : +n[0],
				y : +n[1]
			}
		 : u - 2 === r && (i[2] = {
				x : +n[0],
				y : +n[1]
			}, i[3] = {
				x : +n[2],
				y : +n[3]
			}) : i[0] = {
			x : +n[u - 2],
			y : +n[u - 1]
		}
		 : u - 4 === r ? i[3] = i[2] : r || (i[0] = {
					x : +n[r],
					y : +n[r + 1]
				}),
		f.push([(-i[0].x + 6 * i[1].x + i[2].x) / 6, (-i[0].y + 6 * i[1].y + i[2].y) / 6, (i[1].x + 6 * i[2].x - i[3].x) / 6, (i[1].y + 6 * i[2].y - i[3].y) / 6, i[2].x, i[2].y]);
		return f
	}
}
(window, document, MasterChart), function (n, t, i) {
	"use strict";
	i.EventEmitter = function () {
		function t(t, i) {
			n[t] = n[t] || [];
			n[t].push(i)
		}
		function i(t, i) {
			n[t] && (i ? (n[t].splice(n[t].indexOf(i), 1), n[t].length === 0 && delete n[t]) : delete n[t])
		}
		function r(t, i) {
			n[t] && n[t].forEach(function (n) {
				n(i)
			})
		}
		var n = [];
		return {
			addEventHandler : t,
			removeEventHandler : i,
			emit : r
		}
	}
}
(window, document, MasterChart), function (n, t, i) {
	"use strict";
	i.xmlNs = {
		qualifiedName : "xmlns:ct",
		prefix : "ct",
		uri : "http://gionkunz.github.com/chartist-js/ct"
	};
	i.Svg = function (n, r, u, f, e) {
		function s(n, t, r) {
			return Object.keys(t).forEach(function (u) {
				t[u] !== undefined && (r ? n.setAttributeNS(r, [i.xmlNs.prefix, ":", u].join(""), t[u]) : n.setAttribute(u, t[u]))
			}),
			n
		}
		function v(n, r, u, f, e) {
			var o = t.createElementNS(c, n);
			return n === "svg" && o.setAttributeNS(l, i.xmlNs.qualifiedName, i.xmlNs.uri),
			f && (e && f.firstChild ? f.insertBefore(o, f.firstChild) : f.appendChild(o)),
			r && s(o, r),
			u && h(o, u),
			o
		}
		function y(n, r, u, f, e, o, s, h) {
			var c,
			l;
			return typeof n == "string" && (c = t.createElement("div"), c.innerHTML = n, n = c.firstChild),
			n.setAttribute("xmlns", a),
			l = i.Svg("foreignObject", {
					x : r,
					y : u,
					width : f,
					height : e
				}, o, s, h),
			l._node.appendChild(n),
			l
		}
		function p(n, i) {
			n.appendChild(t.createTextNode(i))
		}
		function w(n) {
			while (n.firstChild)
				n.removeChild(n.firstChild)
		}
		function b(n) {
			n.parentNode.removeChild(n)
		}
		function k(n, t) {
			n.parentNode.replaceChild(t, n)
		}
		function d(n, t, i) {
			i && n.firstChild ? n.insertBefore(t, n.firstChild) : n.appendChild(t)
		}
		function o(n) {
			return n.getAttribute("class") ? n.getAttribute("class").trim().split(/\s+/) : []
		}
		function h(n, t) {
			n.setAttribute("class", o(n).concat(t.trim().split(/\s+/)).filter(function (n, t, i) {
					return i.indexOf(n) === t
				}).join(" "))
		}
		function g(n, t) {
			var i = t.trim().split(/\s+/);
			n.setAttribute("class", o(n).filter(function (n) {
					return i.indexOf(n) === -1
				}).join(" "))
		}
		function nt(n) {
			n.setAttribute("class", "")
		}
		var c = "http://www.w3.org/2000/svg",
		l = "http://www.w3.org/2000/xmlns/",
		a = "http://www.w3.org/1999/xhtml";
		return {
			_node : v(n, r, u, f ? f._node : undefined, e),
			_parent : f,
			parent : function () {
				return this._parent
			},
			attr : function (n, t) {
				return s(this._node, n, t),
				this
			},
			empty : function () {
				return w(this._node),
				this
			},
			remove : function () {
				return b(this._node),
				this.parent()
			},
			replace : function (n) {
				return n._parent = this._parent,
				k(this._node, n._node),
				n
			},
			append : function (n, t) {
				return n._parent = this,
				d(this._node, n._node, t),
				n
			},
			elem : function (n, t, r, u) {
				return i.Svg(n, t, r, this, u)
			},
			foreignObject : function (n, t, i, r, u, f, e) {
				return y(n, t, i, r, u, f, this, e)
			},
			text : function (n) {
				return p(this._node, n),
				this
			},
			addClass : function (n) {
				return h(this._node, n),
				this
			},
			removeClass : function (n) {
				return g(this._node, n),
				this
			},
			removeAllClasses : function () {
				return nt(this._node),
				this
			},
			classes : function () {
				return o(this._node)
			}
		}
	}
}
(window, document, MasterChart), function (n, t, i) {
	"use strict";
	i.Line = function (t, r, u, f) {
		function a(n, t) {
			var w,
			b,
			y,
			k,
			s,
			h,
			u,
			c,
			a,
			ft,
			f,
			d,
			nt,
			g,
			tt,
			v,
			it;
			t !== undefined && t !== null && (r = t);
			y = [];
			s = i.normalizeDataArray(i.getDataArray(r), r.labels.length);
			e = i.createSvg(l, n.width, n.height, n.classNames.chart);
			k = i.getBounds(e, s, n);
			w = n.axisX.offset;
			n.axisX.showLabel && (w += i.calculateLabelOffset(e, r.labels, [n.classNames.label, n.classNames.horizontal].join(" "), n.axisX.labelInterpolationFnc, i.getHeight));
			b = n.axisY.offset;
			n.axisY.showLabel && (b += i.calculateLabelOffset(e, k.values, [n.classNames.label, n.classNames.horizontal].join(" "), n.axisY.labelInterpolationFnc, i.getWidth));
			var p = i.createChartRect(e, n, w, b),
			rt = e.elem("g"),
			ut = e.elem("g");
			for (i.createAxis("x", p, r.labels, ut, rt, w, n, o), i.createAxis("y", p, k.values, ut, rt, b, n, o), h = i.extend({}, p), h.x1 = h.x1 + i.percentage(n.axisX.leftPadding, p.width()), h.x2 = h.x2 - i.percentage(n.axisX.rightPadding, p.width()), h.y1 = h.y1 - i.percentage(n.axisY.bottomPadding, p.height()), h.y2 = h.y2 + i.percentage(n.axisY.topPadding, p.height()), u = 0; u < r.series.length; u++) {
				for (y[u] = e.elem("g"), r.series[u].name && y[u].attr({
						"series-name" : r.series[u].name
					}, i.xmlNs.uri), y[u].addClass([n.classNames.series, r.series[u].className || n.classNames.series + "-" + i.alphaNumerate(u), n.selectSeries === u ? "selected" : ""].join(" ")), a = [], f = 0; f < s[u].length; f++)
					c = i.projectPoint(h, k, s[u], f), s[u][f] === null || isNaN(c.y) ? a.push(c.x, null) : a.push(c.x, c.y), n.showPoint && s[u][f] !== null && s[u][f] !== undefined && (d = n.classNames.point, r.seriesTypes !== undefined && r.seriesTypes.length > u && r.seriesTypes[u].length > f && (nt = r.seriesTypes[u][f], nt !== null && (d += " " + d + "-type-" + nt)), ft = y[u].elem("circle", {
								cx : c.x,
								cy : c.y,
								r : n.selectSeries === u ? 4 : 3
							}, d).attr({
								value : s[u][f]
							}, i.xmlNs.uri), o.emit("draw", {
							type : "point",
							value : s[u][f],
							index : f,
							group : y[u],
							element : ft,
							x : c.x,
							y : c.y
						}));
				if (n.showLine) {
					for (g = [], tt = null, v = 1; v < a.length; v += 2)
						a[v] !== null && (it = a[v - 1] + "," + a[v], tt === null ? g.push("M" + it) : g.push("L" + it)), a[v] != null && (tt = a[v]);
					y[u].elem("path", {
						d : g.join("")
					}, n.classNames.line, !0).attr({
						values : s[u]
					}, i.xmlNs.uri)
				}
			}
		}
		function h(n, t) {
			var i = s.currentOptions;
			n !== undefined && n !== null && $.extend(!0, i, n);
			a(i, t)
		}
		function y() {
			n.removeEventListener("resize", h);
			s.removeMediaQueryListeners()
		}
		function p(n, t) {
			o.addEventHandler(n, t)
		}
		function w(n, t) {
			o.removeEventHandler(n, t)
		}
		var v = {
			axisX : {
				offset : 10,
				showLabel : !0,
				showGrid : !0,
				labelInterpolationFnc : i.noop,
				topPadding : 0,
				leftPadding : 0,
				rightPadding : 0
			},
			axisY : {
				offset : 15,
				showLabel : !0,
				showGrid : !0,
				labelAlign : "right",
				labelInterpolationFnc : i.noop,
				scaleMinSpace : 30,
				leftPadding : 0,
				rightPadding : 0
			},
			width : undefined,
			height : undefined,
			showLine : !0,
			selectSeries : undefined,
			showPoint : !0,
			showArea : !1,
			areaBase : 0,
			lineSmooth : !0,
			low : undefined,
			high : undefined,
			chartPadding : 5,
			classNames : {
				chart : "chart--line",
				label : "label",
				series : "series",
				line : "line",
				point : "point",
				area : "area",
				grid : "grid",
				vertical : "vertical",
				horizontal : "horizontal"
			}
		},
		s,
		l = typeof queryOrElement == "object" && queryOrElement.nodeName ? queryOrElement : i.querySelector(t),
		e,
		o = i.EventEmitter(),
		c;
		return n.addEventListener("resize", function () {
			h()
		}),
		s = i.optionsProvider(v, u, f, o),
		n.requestAnimationFrame(function () {
			a(s.currentOptions)
		}),
		c = {
			version : i.version,
			update : h,
			on : p,
			off : w,
			detach : y
		},
		l.masterChart = c,
		c
	}
}
(window, document, MasterChart);
(function () {}), function (n, t, i) {
	"use strict";
	i.Bar = function (t, r, u, f) {
		function a(n, t) {
			var g,
			nt,
			p,
			d,
			h,
			f,
			tt,
			u,
			ft,
			it,
			a,
			v,
			et,
			b,
			k;
			t !== undefined && t !== null && (r = t);
			p = [];
			h = i.normalizeDataArray(i.getDataArray(r), r.labels.length);
			e = i.createSvg(l, n.width, n.height, n.classNames.chart);
			d = i.getBounds(e, h, n, 0);
			g = n.axisX.offset;
			n.axisX.showLabel && (g += i.calculateLabelOffset(e, r.labels, [n.classNames.label, n.classNames.horizontal].join(" "), n.axisX.labelInterpolationFnc, i.getHeight));
			nt = n.axisY.offset;
			n.axisY.showLabel && (nt += i.calculateLabelOffset(e, d.values, [n.classNames.label, n.classNames.horizontal].join(" "), n.axisY.labelInterpolationFnc, i.getWidth));
			var y = i.createChartRect(e, n, g, nt),
			rt = e.elem("g"),
			ut = e.elem("g"),
			w = n.reverseAxis === !0,
			s = w ? "y" : "x",
			c = w ? "x" : "y",
			ot = w ? r.labels.reverse() : r.labels;
			for (n["axis" + s.toUpperCase()].extraGridLine = !0, i.createAxis(s, y, ot, ut, rt, g, n, o), i.createAxis(c, y, d.values, ut, rt, nt, n, o), f = i.extend({}, y), f.x1 = f.x1 + i.percentage(n.axisX.leftPadding, y.width()), f.x2 = f.x2 - i.percentage(n.axisX.rightPadding, y.width()), f.y1 = f.y1 - i.percentage(n.axisY.bottomPadding, y.height()), f.y2 = f.y2 + i.percentage(n.axisY.topPadding, y.height()), tt = i[w ? "projectAndRotatePoint" : "projectPoint"](f, d, [0], 0, !0), u = 0; u < r.series.length; u++)
				for (ft = f[w ? "height" : "width"]() / h[u].length / 2, p[u] = e.elem("g"), r.series[u].name && p[u].attr({
						"series-name" : r.series[u].name
					}, i.xmlNs.uri), p[u].addClass([n.classNames.series, r.series[u].className || n.classNames.series + "-" + i.alphaNumerate(u)].join(" ")), it = 20, a = 0; a < h[u].length; a++)
					h[u][a] !== null && (v = i[w ? "projectAndRotatePoint" : "projectPoint"](f, d, h[u], a, !0), v[s] += ft + it * u - (it + n.seriesBarDistance) * (h.length - 1) / 2 + u * n.seriesBarDistance, b = {}, b[s + "1"] = v[s], b[s + "2"] = v[s], b[c + "1"] = tt[c], b[c + "2"] = v[c], et = p[u].elem("line", b, n.classNames.bar).attr({
								value : h[u][a]
							}, i.xmlNs.uri), k = {
							type : "bar",
							value : h[u][a],
							index : a,
							group : p[u],
							element : et
						}, k[s + "1"] = v[s], k[s + "2"] = v[s], k[c + "1"] = tt[c], k[c + "2"] = v[c], o.emit("draw", k))
		}
		function h(n, t) {
			n !== undefined && n !== null && $.extend(s.currentOptions, n);
			a(s.currentOptions, t)
		}
		function y() {
			n.removeEventListener("resize", h);
			s.clear()
		}
		function p(n, t) {
			o.addEventHandler(n, t)
		}
		function w(n, t) {
			o.removeEventHandler(n, t)
		}
		var v = {
			axisX : {
				offset : 10,
				showLabel : !0,
				showGrid : !0,
				topPadding : 0,
				leftPadding : 0,
				rightPadding : 0,
				labelInterpolationFnc : i.noop
			},
			axisY : {
				offset : 15,
				showLabel : !0,
				showGrid : !0,
				labelAlign : "right",
				topPadding : 0,
				bottomPadding : 0,
				labelInterpolationFnc : i.noop,
				scaleMinSpace : 40
			},
			width : undefined,
			height : undefined,
			high : undefined,
			low : undefined,
			chartPadding : 5,
			seriesBarDistance : 15,
			classNames : {
				chart : "chart--bar",
				label : "label",
				series : "series",
				bar : "bar",
				thin : "thin",
				thick : "thick",
				grid : "grid",
				vertical : "vertical",
				horizontal : "horizontal"
			}
		},
		s,
		l = typeof t == "object" && t.nodeName ? t : i.querySelector(queryOrContainer),
		e,
		o = i.EventEmitter(),
		c;
		return n.addEventListener("resize", h),
		s = i.optionsProvider(v, u, f, o),
		setTimeout(function () {
			a(s.currentOptions)
		}, 0),
		c = {
			version : i.version,
			update : h,
			on : p,
			off : w,
			detach : y
		},
		l.masterChart = c,
		c
	}
}
(window, document, MasterChart), function () {}

(), function () {
	var n = {
		axisX : {
			offset : 0,
			showLabel : !0,
			showGrid : !0,
			topPadding : 5,
			leftPadding : 0,
			rightPadding : 3
		},
		axisY : {
			offset : 5,
			showLabel : !1,
			showGrid : !0,
			labelAlign : "right",
			topPadding : 5,
			bottomPadding : 4,
			scaleMinSpace : 30
		},
		reverseAxis : !0,
		width : undefined,
		height : undefined,
		high : undefined,
		low : undefined,
		chartPadding : 0,
		seriesBarDistance : 4,
		classNames : {
			chart : "chart--bar",
			label : "label",
			series : "series",
			bar : "bar",
			thin : "thin",
			thick : "thick",
			grid : "grid",
			vertical : "vertical",
			horizontal : "horizontal"
		}
	};
	$('[data-chart="horz-bar"]').each(function () {
		var t = $(this),
		i = {
			high : parseInt(t.data("chart-high")),
			low : parseInt(t.data("chart-low")),
			axisX : {
				showLabel : t.data("chart-x-show-label") != !1
			}
		};
		$.extend(!0, n, i);
		MasterChart.Bar(this, {
			labels : JSON.parse(t.attr("data-chart-labels")),
			series : JSON.parse(t.attr("data-chart-series"))
		}, n)
	})
}
(), function () {
	var n = {
		axisX : {
			offset : 0,
			showLabel : !0,
			showGrid : !0,
			leftPadding : 4,
			rightPadding : 4,
			topPadding : 5
		},
		axisY : {
			offset : 5,
			showLabel : !0,
			showGrid : !0,
			labelAlign : "right",
			scaleMinSpace : 30,
			topPadding : 5,
			bottomPadding : 4
		},
		width : undefined,
		height : undefined,
		showLine : !0,
		selectSeries : 0,
		showPoint : !0,
		lineSmooth : !1,
		low : undefined,
		high : undefined,
		chartPadding : 0,
		seriesBarDistance : 30,
		classNames : {
			chart : "chart--line",
			label : "label",
			series : "series",
			bar : "bar",
			point : "point",
			grid : "grid",
			vertical : "vertical",
			horizontal : "horizontal"
		}
	};
	$('[data-chart="line"]').each(function () {
		var i = $(this),
		f = i.attr("data-chart-labels"),
		e = i.attr("data-chart-series"),
		r,
		u,
		t;
		f && e && (r = {
				labels : JSON.parse(f),
				series : JSON.parse(e)
			}, u = i.attr("data-chart-series-types"), u !== undefined && (r.seriesTypes = JSON.parse(u)), t = $.extend(!0, {}, n), i.closest(".trend").length > 0 && (t.selectSeries = null, t.axisX.showLabel = !1, t.axisY.topPadding = 8), MasterChart.Line(this, r, t))
	})
}
()
