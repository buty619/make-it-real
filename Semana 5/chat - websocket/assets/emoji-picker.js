(function(window) {
  var selection; // keeps the selection range in the text area element
  var selectors = {
    icon: "emopickr-icon",
    input: "emopickr-input",
    picker: "emopickr",
    header: "emopickr-header",
    tab: "emopickr-tab",
    body: "emopickr-body",
    searchResultsTitle: "emopickr-search-results-title",
    searchInput: "emopickr-search-input",
    sections: "emopickr-sections",
    section: "emopickr-section",
    sectionList: "emopickr-section-list",
    emojiWrapper: "emoji-wrapper",
    emoji: "emoji"
  }
  var Picker = {};

  Picker.defaults = {
    imagePath: "static/sheet_apple_64_indexed_128.png",
    iconType: "emoji", // image, font (uses classes)
    iconEmoji: "nerd_face",
    iconClass: "", // for sizing and styling
    iconImagePath: null
  };

  Picker.init = initPicker;
  Picker.render = render;
  Picker.clean = clean;

  function initPicker(selector) {
    var target = document.querySelector(selector);
    target.classList.add(selectors.input);
    target.parentElement.classList.add("emopickr-parent");

    var iconElem = createPickerIcon();
    target.parentNode.insertBefore(iconElem, target.nextSibling);

    var pickerElem = createPicker();
    document.body.appendChild(pickerElem);
    target.parentNode.insertBefore(pickerElem, target.nextSibling);

    bindEvents(target);
    selection = saveSelection();
  }

  function createPickerIcon(areaElem) {
    if (EmojiPicker.defaults.iconType === "image") {
      if (!EmojiPicker.defaults.iconImagePath) {
        console.error("No iconImagePath set, switching to 'emoji' icon");
        EmojiPicker.defaults.iconType = "emoji";
      } else {
        var iconElem = document.createElement("img");
        iconElem.src = EmojiPicker.defaults.iconImagePath;
        iconElem.className = selectors.icon;
        return iconElem;
      }
    }

    if (EmojiPicker.defaults.iconType === "font") {
      var iconElem = document.createElement("span");
      iconElem.className = selectors.icon + " " + EmojiPicker.defaults.iconClass;
      return iconElem;
    }

    if (EmojiPicker.defaults.iconType === "emoji") {
      if (!data[EmojiPicker.defaults.iconEmoji]) {
        console.error("No emoji with name " + EmojiPicker.defaults.iconEmoji + ", using default name 'smile'");
        EmojiPicker.defaults.iconEmoji = "smile";
      }

      var iconElem = nameToImage(EmojiPicker.defaults.iconEmoji);
      iconElem.className = selectors.icon;
      return iconElem;
    }
    
  }

  function createPicker() {
    var pickerElem = document.createElement("div");
    pickerElem.className = selectors.picker;

    var headerElem = createPickerHeader();
    pickerElem.appendChild(headerElem);

    var bodyElem = createPickerBody();
    pickerElem.appendChild(bodyElem);
    return pickerElem;
    
  }

  function createPickerHeader() {
    var header = document.createElement("div");
    header.className = selectors.header;
    addHeaderTabs(header);

    return header;
  }

  function addHeaderTabs(headerElem) {
    headerElem.appendChild(createHeaderTab("People", ":sunglasses:", true));
    headerElem.appendChild(createHeaderTab("Nature", ":shamrock:", false));
    headerElem.appendChild(createHeaderTab("Foods", ":pizza:", false));
    headerElem.appendChild(createHeaderTab("Activity", ":football:", false));
    headerElem.appendChild(createHeaderTab("Places", ":airplane:", false));
    headerElem.appendChild(createHeaderTab("Objects", ":bulb:", false));
    headerElem.appendChild(createHeaderTab("Symbols", ":heart:", false));
    headerElem.appendChild(createHeaderTab("Flags", ":waving_white_flag:", false));
  }

  function createHeaderTab(title, name, active) {
    var tab = document.createElement("a");
    tab.className = selectors.tab;
    tab.setAttribute("data-group-name", title);
    tab.appendChild(nameToImage(name));

    if (active) {
      tab.classList.add("active");
    }

    return tab;
  }

  function createPickerBody() {
    var contentElem = document.createElement("div");
    contentElem.className = selectors.body;

    var searchInputElem = createSearchInput();
    contentElem.appendChild(searchInputElem);

    var searchTitleElem = document.createElement("h3");
    searchTitleElem.className = selectors.searchResultsTitle;
    var searchTitleText = document.createTextNode("Search Results");
    searchTitleElem.appendChild(searchTitleText);
    contentElem.appendChild(searchTitleElem);

    var sectionsElem = document.createElement("div");
    sectionsElem.className = selectors.sections;
    contentElem.appendChild(sectionsElem);

    addEmojiIcons(sectionsElem);

    return contentElem;
  }

  function createSearchInput() {
    var input = document.createElement("input");
    input.id = selectors.searchInput;
    input.type = "text";
    input.setAttribute("placeholder", "Search");

    return input;
  }

  function addEmojiIcons(itemsElem) {
    var categories = ["People", "Nature", "Foods", "Activity", "Places", "Objects", "Symbols", "Flags"];
    categories.forEach(function(category) {
      addEmojiIconsCategory(category, itemsElem);
    });
  }

  function addEmojiIconsCategory(category, itemsElem) {
    var emojiList = emojiData[category];

    var sectionElem = document.createElement("div");
    sectionElem.className = selectors.section;
    sectionElem.setAttribute("data-group-name", category);

    var titleElem = document.createElement("h3");
    titleElem.appendChild(document.createTextNode(category));
    sectionElem.appendChild(titleElem);

    var emojiListElem = document.createElement("div");
    emojiListElem.className = selectors.sectionList;
    sectionElem.appendChild(emojiListElem);

    itemsElem.appendChild(sectionElem);

    emojiList.forEach(function(name) {
      var wrapperElem = document.createElement("span");
      wrapperElem.className = selectors.emojiWrapper;
      wrapperElem.appendChild(nameToImage(name));

      emojiListElem.appendChild(wrapperElem);
    });
  }

  function bindEvents(element) {
    var iconElem = document.querySelector("." + selectors.icon);
    iconElem.addEventListener('click', showPicker);

    var emojiListElems = document.querySelectorAll("." + selectors.sectionList);
    for (var i=0; i < emojiListElems.length; i++) {
      emojiListElems[i].addEventListener("click", handleEmojiClick);
    }

    document.addEventListener('keyup', handleDocumentKeyUp);

    var itemsElement = document.querySelector("." + selectors.sections);
    itemsElement.addEventListener("scroll", handleItemsScroll);

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    element.addEventListener('input', handleTextAreaInput);

    var inputElement = document.querySelector("#" + selectors.searchInput);
    inputElement.addEventListener('input', handleSearchInput);

    var tabs = document.querySelectorAll("." + selectors.tab);
    for (var i=0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', handleTabClick);
    }
  }

  function handleEmojiClick(e) {
    if (e.target.classList.contains("emoji")) {
      selectEmoji(e.target.getAttribute("data-emoji-name"));
    }
  }

  function handleDocumentKeyUp(e) {
    if (getPressedKey(e) === 27) { // ESC
      closePicker();
    }
  }

  function handleTextAreaInput(e) {
    selection = saveSelection();

    var nodes = e.currentTarget.childNodes;
    for (var i=0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType == Node.TEXT_NODE) {
        replaceEmojisInNode(node, selection);
      }
    }

    var key = getKeyFromSelection(selection);
    if (key === ":") {
      handleColonKey(e);
    } else {
      handleOtherKeys(e);
    }

    if (!shouldKeepSearching()) {
      stopSearching();
    }

    restoreSelection(selection);
  }

  function handleColonKey(e) {
    var pickerElem = document.querySelector("." + selectors.picker);
    if (!pickerElem.classList.contains("open")) {
      startSearching();
    } else {
      handleOtherKeys(e);
    }
  }

  function handleOtherKeys(e) {
    if (searching) {
      var text = e.currentTarget.textContent;
      var query = text.substr(text.lastIndexOf(":") + 1);

      var inputElement = document.querySelector("#" + selectors.searchInput);
      inputElement.value = query;
      search(query);
    }
  }

  function replaceEmojisInNode(node, selection) {
    var text = node.nodeValue;
    var regex = RegExp('\:(.*?)\:', 'gm');
    while ((result = regex.exec(text)) !== null) {
      var name = result[1];
      if (data[name]) {
        var lastKey = getKeyFromSelection(selection);

        var range = document.createRange();
        range.setStart(node, result.index);
        range.setEnd(node, result.index + result[0].length);
        range.deleteContents();

        var emojiElem = nameToImage(name);
        range.insertNode(emojiElem);

        if (node == selection.endContainer && (searching || lastKey == ":")) {
          selection.setEndAfter(emojiElem);
          selection.collapse();
        }
      }
    }
  }

  function getKeyFromSelection(s) {
    if (!s) { return; }

    var node = s.endContainer;
    if (node.nodeType == Node.TEXT_NODE) {
      var text = node.nodeValue;
      var offset = s.endOffset;
      return text[offset - 1];
    }
  }

  function handleItemsScroll(e) {
    var sections = document.querySelectorAll("." + selectors.section);
    var itemsTop = e.currentTarget.getBoundingClientRect().top;
    var minDiff = Number.MIN_SAFE_INTEGER;

    var closest;
    for (var i=0; i < sections.length; i++) {
      var section = sections[i];
      section.classList.remove("sticky");

      var top = section.getBoundingClientRect().top - itemsTop;
      if (i > 0) { top = top - 20; }
      if (top < 0 && top > minDiff) {
        closest = section;
        minDiff = top;
      }
    }

    var isSearching = document.querySelector("#" + selectors.searchInput).value.trim().length > 0;
    if (closest && !isSearching) {
      closest.classList.add("sticky");
      var name = closest.getAttribute("data-group-name");
      setActiveTab(name);
    }
  }

  function handleFocus() {
    if (!shouldKeepSearching()) {
      closePicker();
    }
  }

  function handleBlur() {
    selection = saveSelection();
  }

  function handleTabClick(e) {
    var category = e.currentTarget.getAttribute("data-group-name");
    document.querySelector("." + selectors.section + "[data-group-name=" + category + "]").scrollIntoView();
    setActiveTab(category);
  }

  function handleSearchInput(e) {
    var pickerElem = document.querySelector("." + selectors.picker);
    var query = e.currentTarget.value.trim();
    if (query.length > 0) {
      search(query);
    } else {
      pickerElem.classList.remove("emoji-search-on");
    }
  }

  function showPicker() {
    search('');
    var pickerElem = document.querySelector("." + selectors.picker);
    pickerElem.classList.add("open");
  }

  function closePicker() {
    var pickerElem = document.querySelector("." + selectors.picker);
    pickerElem.classList.remove("open");
  }

  function selectEmoji(name) {
    var textAreaElem = document.querySelector("." + selectors.input);

    if (!selection || selection.endContainer.nodeType != Node.TEXT_NODE) {
      var node = selectEmojiWhenNoSelection(name, textAreaElem);
    } else {
      var node = selectEmojiWhenSelection(name, textAreaElem, selection);
    }

    replaceEmojisInNode(node, selection);
    stopSearching();
  }

  function selectEmojiWhenNoSelection(name, textAreaElem) {
    var node = document.createTextNode(':' + name + ':');
    textAreaElem.appendChild(node);

    // create and restore selection
    selection = document.createRange();
    selection.setStart(node, name.length + 2);
    selection.setEnd(node, name.length + 2);
    restoreSelection(selection);

    return node;
  }

  function selectEmojiWhenSelection(name, textAreaElem, selection) {
    textAreaElem.focus();
    restoreSelection(selection);

    var node = selection.endContainer;
    var text = node.nodeValue;
    var pos = selection.endOffset;

    if (searching) {
      pos = text.lastIndexOf(":");
      text = text.slice(0, pos);
    }

    node.nodeValue = text.slice(0, pos) + ':' + name + ':' + text.slice(pos);
    selection.setEnd(node, pos + name.length + 2);
    selection.collapse();
    console.log(node);
    return node;
  }

  function setActiveTab(group) {
    var tabs = document.querySelectorAll('.' + selectors.tab);
    if (tabs.length) {
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].classList.remove('active');
      }
    }

    var activeTab = document.querySelector('.' + selectors.tab + '[data-group-name=' + group + ']');
    activeTab.classList.add('active');
  }
 
  //genera el span con la data del emoji
  function nameToImage(name) {
    var key = name.replace(/:/g, "");
    var emoji = data[key];
    if (emoji) {
      var coordinates = emoji["c"];
      var otherNames = emoji["n"];

      if (coordinates) {
        var mul = 2.5;

        var spanElement = document.createElement("span");
        spanElement.className = selectors.emoji;
        spanElement.style = "display: inline-block; background: url('" + Picker.defaults.imagePath + "') " + mul * coordinates[0] + "% " + mul * coordinates[1] + "%; background-size: 4100%;";
        spanElement.setAttribute("contenteditable",  false);
        spanElement.setAttribute("data-emoji-name", name);
        spanElement.setAttribute("data-other-names", otherNames.join(" "));
        console.log(spanElement)
        return spanElement;
      } else {
        return ;
      }
    }
  }

  function getPressedKey(e) {
    return (typeof e.which == "number") ? e.keyCode : e.which;
  }

  var searching = false;
  function startSearching() {
    search('');
    showPicker();
    searching = true;
    searchNode = selection.endContainer;
    searchOffset = selection.endOffset;
  }

  function stopSearching() {
    search('');
    closePicker();
    searching = false;
    searchNode = null;
    searchOffset = null;
  }

  function shouldKeepSearching() {
    if (searching && selection && searchNode == selection.endContainer && searchOffset <= selection.endOffset) {
      var text = searchNode.nodeValue;
      if (text[searchOffset - 1] == ":") {
        return true;
      }
    }

    return false;
  }

  function search(query) {
    if (query.length === 0) {
      cleanSearch();
    } else {
      executeSearch(query);
    }
  }

  function cleanSearch() {
    var pickerElem = document.querySelector("." + selectors.picker);
    document.querySelector('#' + selectors.searchInput).value = '';
    pickerElem.classList.remove("emoji-search-on");

    var emojis = document.querySelectorAll("." + selectors.sections + " .emoji");
    for (var i=0; i < emojis.length; i++) {
      var emojiElement = emojis[i];
      emojiElement.parentElement.classList.remove("emoji-match");
    }
  }

  function executeSearch(query) {
    var pickerElem = document.querySelector("." + selectors.picker);
    pickerElem.classList.add("emoji-search-on");

    var emojis = document.querySelectorAll("." + selectors.sections + " .emoji");
    var found = 0;
    for (var i=0; i < emojis.length; i++) {
      var emojiElement = emojis[i];
      var name = emojiElement.getAttribute("data-emoji-name");
      name += " " + emojiElement.getAttribute("data-other-names");
      if (name.match(new RegExp(escapeRegExp(query), "gi"))) {
        found++;
        emojiElement.parentElement.classList.add("emoji-match");
      } else {
        emojiElement.parentElement.classList.remove("emoji-match");
      }
    }
  }

  function render(string) {
    var regex = /\:(.*?)\:/gm;
    return string.replace(regex, function(i, match) {
      if (data[match]) {
        var h = nameToImage(match)
        if (h) {
          return h.outerHTML;
        } else {
          return match;
        }
      }
    });
  }

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function saveSelection() {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  function restoreSelection(range) {
    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }

  function clean(text) {
    var div = document.createElement("div");
    div.innerHTML = text.trim();

    var emojis = div.querySelectorAll("span.emoji");
    for (var i=0; i < emojis.length; i++) {
      var emoji = emojis[i];
      div.replaceChild(document.createTextNode(":" + emoji.getAttribute("data-emoji-name") + ":"), emoji);
    }
    return div.innerHTML;
  }

  var data = {"copyright":{"n":[],"c":[0,0,11,0]},"registered":{"n":[],"c":[0,1,11,0]},"bangbang":{"n":[],"c":[0,2,15,0]},"interrobang":{"n":[],"c":[0,3,15,0]},"tm":{"n":[],"c":[0,4,11,0]},"information_source":{"n":[],"c":[0,5,15,0]},"left_right_arrow":{"n":[],"c":[0,6,15,0]},"arrow_up_down":{"n":[],"c":[0,7,15,0]},"arrow_upper_left":{"n":[],"c":[0,8,15,0]},"arrow_upper_right":{"n":[],"c":[0,9,15,0]},"arrow_lower_right":{"n":[],"c":[0,10,15,0]},"arrow_lower_left":{"n":[],"c":[0,11,15,0]},"leftwards_arrow_with_hook":{"n":[],"c":[0,12,15,0]},"arrow_right_hook":{"n":[],"c":[0,13,15,0]},"watch":{"n":[],"c":[0,14,15,0]},"hourglass":{"n":[],"c":[0,15,15,0]},"keyboard":{"n":[],"c":[0,16,15,0]},"eject":{"n":[],"c":[0,17,2,0]},"fast_forward":{"n":[],"c":[0,18,15,0]},"rewind":{"n":[],"c":[0,19,15,0]},"arrow_double_up":{"n":[],"c":[0,20,15,0]},"arrow_double_down":{"n":[],"c":[0,21,15,0]},"black_right_pointing_double_triangle_with_vertical_bar":{"n":[],"c":[0,22,15,0]},"black_left_pointing_double_triangle_with_vertical_bar":{"n":[],"c":[0,23,15,0]},"black_right_pointing_triangle_with_double_vertical_bar":{"n":[],"c":[0,24,15,0]},"alarm_clock":{"n":[],"c":[0,25,15,0]},"stopwatch":{"n":[],"c":[0,26,15,0]},"timer_clock":{"n":[],"c":[0,27,15,0]},"hourglass_flowing_sand":{"n":[],"c":[0,28,15,0]},"double_vertical_bar":{"n":[],"c":[0,29,15,0]},"black_square_for_stop":{"n":[],"c":[0,30,15,0]},"black_circle_for_record":{"n":[],"c":[0,31,15,0]},"m":{"n":[],"c":[0,32,15,0]},"black_small_square":{"n":[],"c":[0,33,15,0]},"white_small_square":{"n":[],"c":[0,34,15,0]},"arrow_forward":{"n":[],"c":[0,35,15,0]},"arrow_backward":{"n":[],"c":[0,36,15,0]},"white_medium_square":{"n":[],"c":[0,37,15,0]},"black_medium_square":{"n":[],"c":[0,38,15,0]},"white_medium_small_square":{"n":[],"c":[0,39,15,0]},"black_medium_small_square":{"n":[],"c":[0,40,15,0]},"sunny":{"n":[],"c":[1,0,15,0]},"cloud":{"n":[],"c":[1,1,15,0]},"umbrella":{"n":[],"c":[1,2,15,0]},"snowman":{"n":[],"c":[1,3,15,0]},"comet":{"n":[],"c":[1,4,15,0]},"phone":{"n":["telephone"],"c":[1,5,15,0]},"ballot_box_with_check":{"n":[],"c":[1,6,15,0]},"umbrella_with_rain_drops":{"n":[],"c":[1,7,15,0]},"coffee":{"n":[],"c":[1,8,15,0]},"shamrock":{"n":[],"c":[1,9,15,0]},"point_up":{"n":[],"c":[1,10,15,0]},"skull_and_crossbones":{"n":[],"c":[1,16,15,0]},"radioactive_sign":{"n":[],"c":[1,17,15,0]},"biohazard_sign":{"n":[],"c":[1,18,15,0]},"orthodox_cross":{"n":[],"c":[1,19,15,0]},"star_and_crescent":{"n":[],"c":[1,20,15,0]},"peace_symbol":{"n":[],"c":[1,21,15,0]},"yin_yang":{"n":[],"c":[1,22,15,0]},"wheel_of_dharma":{"n":[],"c":[1,23,15,0]},"white_frowning_face":{"n":[],"c":[1,24,15,0]},"relaxed":{"n":[],"c":[1,25,15,0]},"aries":{"n":[],"c":[1,26,15,0]},"taurus":{"n":[],"c":[1,27,15,0]},"gemini":{"n":[],"c":[1,28,15,0]},"cancer":{"n":[],"c":[1,29,15,0]},"leo":{"n":[],"c":[1,30,15,0]},"virgo":{"n":[],"c":[1,31,15,0]},"libra":{"n":[],"c":[1,32,15,0]},"scorpius":{"n":[],"c":[1,33,15,0]},"sagittarius":{"n":[],"c":[1,34,15,0]},"capricorn":{"n":[],"c":[1,35,15,0]},"aquarius":{"n":[],"c":[1,36,15,0]},"pisces":{"n":[],"c":[1,37,15,0]},"spades":{"n":[],"c":[1,38,15,0]},"clubs":{"n":[],"c":[1,39,15,0]},"hearts":{"n":[],"c":[1,40,15,0]},"diamonds":{"n":[],"c":[2,0,15,0]},"hotsprings":{"n":[],"c":[2,1,15,0]},"recycle":{"n":[],"c":[2,2,15,0]},"wheelchair":{"n":[],"c":[2,3,15,0]},"hammer_and_pick":{"n":[],"c":[2,4,15,0]},"anchor":{"n":[],"c":[2,5,15,0]},"crossed_swords":{"n":[],"c":[2,6,15,0]},"scales":{"n":[],"c":[2,7,15,0]},"alembic":{"n":[],"c":[2,8,15,0]},"gear":{"n":[],"c":[2,9,15,0]},"atom_symbol":{"n":[],"c":[2,10,15,0]},"fleur_de_lis":{"n":[],"c":[2,11,15,0]},"warning":{"n":[],"c":[2,12,15,0]},"zap":{"n":[],"c":[2,13,15,0]},"white_circle":{"n":[],"c":[2,14,15,0]},"black_circle":{"n":[],"c":[2,15,15,0]},"coffin":{"n":[],"c":[2,16,15,0]},"funeral_urn":{"n":[],"c":[2,17,15,0]},"soccer":{"n":[],"c":[2,18,15,0]},"baseball":{"n":[],"c":[2,19,15,0]},"snowman_without_snow":{"n":[],"c":[2,20,15,0]},"partly_sunny":{"n":[],"c":[2,21,15,0]},"thunder_cloud_and_rain":{"n":[],"c":[2,22,15,0]},"ophiuchus":{"n":[],"c":[2,23,15,0]},"pick":{"n":[],"c":[2,24,15,0]},"helmet_with_white_cross":{"n":[],"c":[2,25,15,0]},"chains":{"n":[],"c":[2,26,15,0]},"no_entry":{"n":[],"c":[2,27,15,0]},"shinto_shrine":{"n":[],"c":[2,28,15,0]},"church":{"n":[],"c":[2,29,15,0]},"mountain":{"n":[],"c":[2,30,15,0]},"umbrella_on_ground":{"n":[],"c":[2,31,15,0]},"fountain":{"n":[],"c":[2,32,15,0]},"golf":{"n":[],"c":[2,33,15,0]},"ferry":{"n":[],"c":[2,34,15,0]},"boat":{"n":["sailboat"],"c":[2,35,15,0]},"skier":{"n":[],"c":[2,36,15,0]},"ice_skate":{"n":[],"c":[2,37,15,0]},"person_with_ball":{"n":[],"c":[2,38,15,0]},"tent":{"n":[],"c":[3,3,15,0]},"fuelpump":{"n":[],"c":[3,4,15,0]},"scissors":{"n":[],"c":[3,5,15,0]},"white_check_mark":{"n":[],"c":[3,6,15,0]},"airplane":{"n":[],"c":[3,7,15,0]},"email":{"n":["envelope"],"c":[3,8,15,0]},"fist":{"n":[],"c":[3,9,15,0]},"hand":{"n":["raised_hand"],"c":[3,15,15,0]},"v":{"n":[],"c":[3,21,15,0]},"writing_hand":{"n":[],"c":[3,27,15,0]},"pencil2":{"n":[],"c":[3,33,15,0]},"black_nib":{"n":[],"c":[3,34,15,0]},"heavy_check_mark":{"n":[],"c":[3,35,15,0]},"heavy_multiplication_x":{"n":[],"c":[3,36,15,0]},"latin_cross":{"n":[],"c":[3,37,15,0]},"star_of_david":{"n":[],"c":[3,38,15,0]},"sparkles":{"n":[],"c":[3,39,15,0]},"eight_spoked_asterisk":{"n":[],"c":[3,40,15,0]},"eight_pointed_black_star":{"n":[],"c":[4,0,15,0]},"snowflake":{"n":[],"c":[4,1,15,0]},"sparkle":{"n":[],"c":[4,2,15,0]},"x":{"n":[],"c":[4,3,15,0]},"negative_squared_cross_mark":{"n":[],"c":[4,4,15,0]},"question":{"n":[],"c":[4,5,15,0]},"grey_question":{"n":[],"c":[4,6,15,0]},"grey_exclamation":{"n":[],"c":[4,7,15,0]},"exclamation":{"n":["heavy_exclamation_mark"],"c":[4,8,15,0]},"heavy_heart_exclamation_mark_ornament":{"n":[],"c":[4,9,15,0]},"heart":{"n":[],"c":[4,10,15,0,"<3"]},"heavy_plus_sign":{"n":[],"c":[4,11,15,0]},"heavy_minus_sign":{"n":[],"c":[4,12,15,0]},"heavy_division_sign":{"n":[],"c":[4,13,15,0]},"arrow_right":{"n":[],"c":[4,14,15,0]},"curly_loop":{"n":[],"c":[4,15,15,0]},"loop":{"n":[],"c":[4,16,15,0]},"arrow_heading_up":{"n":[],"c":[4,17,15,0]},"arrow_heading_down":{"n":[],"c":[4,18,15,0]},"arrow_left":{"n":[],"c":[4,19,15,0]},"arrow_up":{"n":[],"c":[4,20,15,0]},"arrow_down":{"n":[],"c":[4,21,15,0]},"black_large_square":{"n":[],"c":[4,22,15,0]},"white_large_square":{"n":[],"c":[4,23,15,0]},"star":{"n":[],"c":[4,24,15,0]},"o":{"n":[],"c":[4,25,15,0]},"wavy_dash":{"n":[],"c":[4,26,15,0]},"part_alternation_mark":{"n":[],"c":[4,27,15,0]},"congratulations":{"n":[],"c":[4,28,15,0]},"secret":{"n":[],"c":[4,29,15,0]},"mahjong":{"n":[],"c":[4,30,15,0]},"black_joker":{"n":[],"c":[4,31,15,0]},"a":{"n":[],"c":[4,32,15,0]},"b":{"n":[],"c":[4,33,15,0]},"o2":{"n":[],"c":[4,34,15,0]},"parking":{"n":[],"c":[4,35,15,0]},"ab":{"n":[],"c":[4,36,15,0]},"cl":{"n":[],"c":[4,37,15,0]},"cool":{"n":[],"c":[4,38,15,0]},"free":{"n":[],"c":[4,39,15,0]},"id":{"n":[],"c":[4,40,15,0]},"new":{"n":[],"c":[5,0,15,0]},"ng":{"n":[],"c":[5,1,15,0]},"ok":{"n":[],"c":[5,2,15,0]},"sos":{"n":[],"c":[5,3,15,0]},"up":{"n":[],"c":[5,4,15,0]},"vs":{"n":[],"c":[5,5,15,0]},"koko":{"n":[],"c":[5,6,15,0]},"sa":{"n":[],"c":[5,7,15,0]},"u7121":{"n":[],"c":[5,8,15,0]},"u6307":{"n":[],"c":[5,9,15,0]},"u7981":{"n":[],"c":[5,10,15,0]},"u7a7a":{"n":[],"c":[5,11,15,0]},"u5408":{"n":[],"c":[5,12,15,0]},"u6e80":{"n":[],"c":[5,13,15,0]},"u6709":{"n":[],"c":[5,14,15,0]},"u6708":{"n":[],"c":[5,15,15,0]},"u7533":{"n":[],"c":[5,16,15,0]},"u5272":{"n":[],"c":[5,17,15,0]},"u55b6":{"n":[],"c":[5,18,15,0]},"ideograph_advantage":{"n":[],"c":[5,19,15,0]},"accept":{"n":[],"c":[5,20,15,0]},"cyclone":{"n":[],"c":[5,21,15,0]},"foggy":{"n":[],"c":[5,22,15,0]},"closed_umbrella":{"n":[],"c":[5,23,15,0]},"night_with_stars":{"n":[],"c":[5,24,15,0]},"sunrise_over_mountains":{"n":[],"c":[5,25,15,0]},"sunrise":{"n":[],"c":[5,26,15,0]},"city_sunset":{"n":[],"c":[5,27,15,0]},"city_sunrise":{"n":[],"c":[5,28,15,0]},"rainbow":{"n":[],"c":[5,29,15,0]},"bridge_at_night":{"n":[],"c":[5,30,15,0]},"ocean":{"n":[],"c":[5,31,15,0]},"volcano":{"n":[],"c":[5,32,15,0]},"milky_way":{"n":[],"c":[5,33,15,0]},"earth_africa":{"n":[],"c":[5,34,15,0]},"earth_americas":{"n":[],"c":[5,35,15,0]},"earth_asia":{"n":[],"c":[5,36,15,0]},"globe_with_meridians":{"n":[],"c":[5,37,15,0]},"new_moon":{"n":[],"c":[5,38,15,0]},"waxing_crescent_moon":{"n":[],"c":[5,39,15,0]},"first_quarter_moon":{"n":[],"c":[5,40,15,0]},"moon":{"n":["waxing_gibbous_moon"],"c":[6,0,15,0]},"full_moon":{"n":[],"c":[6,1,15,0]},"waning_gibbous_moon":{"n":[],"c":[6,2,15,0]},"last_quarter_moon":{"n":[],"c":[6,3,15,0]},"waning_crescent_moon":{"n":[],"c":[6,4,15,0]},"crescent_moon":{"n":[],"c":[6,5,15,0]},"new_moon_with_face":{"n":[],"c":[6,6,15,0]},"first_quarter_moon_with_face":{"n":[],"c":[6,7,15,0]},"last_quarter_moon_with_face":{"n":[],"c":[6,8,15,0]},"full_moon_with_face":{"n":[],"c":[6,9,15,0]},"sun_with_face":{"n":[],"c":[6,10,15,0]},"star2":{"n":[],"c":[6,11,15,0]},"stars":{"n":[],"c":[6,12,15,0]},"thermometer":{"n":[],"c":[6,13,15,0]},"mostly_sunny":{"n":["sun_small_cloud"],"c":[6,14,15,0]},"barely_sunny":{"n":["sun_behind_cloud"],"c":[6,15,15,0]},"partly_sunny_rain":{"n":["sun_behind_rain_cloud"],"c":[6,16,15,0]},"rain_cloud":{"n":[],"c":[6,17,15,0]},"snow_cloud":{"n":[],"c":[6,18,15,0]},"lightning":{"n":["lightning_cloud"],"c":[6,19,15,0]},"tornado":{"n":["tornado_cloud"],"c":[6,20,15,0]},"fog":{"n":[],"c":[6,21,15,0]},"wind_blowing_face":{"n":[],"c":[6,22,15,0]},"hotdog":{"n":[],"c":[6,23,15,0]},"taco":{"n":[],"c":[6,24,15,0]},"burrito":{"n":[],"c":[6,25,15,0]},"chestnut":{"n":[],"c":[6,26,15,0]},"seedling":{"n":[],"c":[6,27,15,0]},"evergreen_tree":{"n":[],"c":[6,28,15,0]},"deciduous_tree":{"n":[],"c":[6,29,15,0]},"palm_tree":{"n":[],"c":[6,30,15,0]},"cactus":{"n":[],"c":[6,31,15,0]},"hot_pepper":{"n":[],"c":[6,32,15,0]},"tulip":{"n":[],"c":[6,33,15,0]},"cherry_blossom":{"n":[],"c":[6,34,15,0]},"rose":{"n":[],"c":[6,35,15,0]},"hibiscus":{"n":[],"c":[6,36,15,0]},"sunflower":{"n":[],"c":[6,37,15,0]},"blossom":{"n":[],"c":[6,38,15,0]},"corn":{"n":[],"c":[6,39,15,0]},"ear_of_rice":{"n":[],"c":[6,40,15,0]},"herb":{"n":[],"c":[7,0,15,0]},"four_leaf_clover":{"n":[],"c":[7,1,15,0]},"maple_leaf":{"n":[],"c":[7,2,15,0]},"fallen_leaf":{"n":[],"c":[7,3,15,0]},"leaves":{"n":[],"c":[7,4,15,0]},"mushroom":{"n":[],"c":[7,5,15,0]},"tomato":{"n":[],"c":[7,6,15,0]},"eggplant":{"n":[],"c":[7,7,15,0]},"grapes":{"n":[],"c":[7,8,15,0]},"melon":{"n":[],"c":[7,9,15,0]},"watermelon":{"n":[],"c":[7,10,15,0]},"tangerine":{"n":[],"c":[7,11,15,0]},"lemon":{"n":[],"c":[7,12,15,0]},"banana":{"n":[],"c":[7,13,15,0]},"pineapple":{"n":[],"c":[7,14,15,0]},"apple":{"n":[],"c":[7,15,15,0]},"green_apple":{"n":[],"c":[7,16,15,0]},"pear":{"n":[],"c":[7,17,15,0]},"peach":{"n":[],"c":[7,18,15,0]},"cherries":{"n":[],"c":[7,19,15,0]},"strawberry":{"n":[],"c":[7,20,15,0]},"hamburger":{"n":[],"c":[7,21,15,0]},"pizza":{"n":[],"c":[7,22,15,0]},"meat_on_bone":{"n":[],"c":[7,23,15,0]},"poultry_leg":{"n":[],"c":[7,24,15,0]},"rice_cracker":{"n":[],"c":[7,25,15,0]},"rice_ball":{"n":[],"c":[7,26,15,0]},"rice":{"n":[],"c":[7,27,15,0]},"curry":{"n":[],"c":[7,28,15,0]},"ramen":{"n":[],"c":[7,29,15,0]},"spaghetti":{"n":[],"c":[7,30,15,0]},"bread":{"n":[],"c":[7,31,15,0]},"fries":{"n":[],"c":[7,32,15,0]},"sweet_potato":{"n":[],"c":[7,33,15,0]},"dango":{"n":[],"c":[7,34,15,0]},"oden":{"n":[],"c":[7,35,15,0]},"sushi":{"n":[],"c":[7,36,15,0]},"fried_shrimp":{"n":[],"c":[7,37,15,0]},"fish_cake":{"n":[],"c":[7,38,15,0]},"icecream":{"n":[],"c":[7,39,15,0]},"shaved_ice":{"n":[],"c":[7,40,15,0]},"ice_cream":{"n":[],"c":[8,0,15,0]},"doughnut":{"n":[],"c":[8,1,15,0]},"cookie":{"n":[],"c":[8,2,15,0]},"chocolate_bar":{"n":[],"c":[8,3,15,0]},"candy":{"n":[],"c":[8,4,15,0]},"lollipop":{"n":[],"c":[8,5,15,0]},"custard":{"n":[],"c":[8,6,15,0]},"honey_pot":{"n":[],"c":[8,7,15,0]},"cake":{"n":[],"c":[8,8,15,0]},"bento":{"n":[],"c":[8,9,15,0]},"stew":{"n":[],"c":[8,10,15,0]},"egg":{"n":[],"c":[8,11,15,0]},"fork_and_knife":{"n":[],"c":[8,12,15,0]},"tea":{"n":[],"c":[8,13,15,0]},"sake":{"n":[],"c":[8,14,15,0]},"wine_glass":{"n":[],"c":[8,15,15,0]},"cocktail":{"n":[],"c":[8,16,15,0]},"tropical_drink":{"n":[],"c":[8,17,15,0]},"beer":{"n":[],"c":[8,18,15,0]},"beers":{"n":[],"c":[8,19,15,0]},"baby_bottle":{"n":[],"c":[8,20,15,0]},"knife_fork_plate":{"n":[],"c":[8,21,15,0]},"champagne":{"n":[],"c":[8,22,15,0]},"popcorn":{"n":[],"c":[8,23,15,0]},"ribbon":{"n":[],"c":[8,24,15,0]},"gift":{"n":[],"c":[8,25,15,0]},"birthday":{"n":[],"c":[8,26,15,0]},"jack_o_lantern":{"n":[],"c":[8,27,15,0]},"christmas_tree":{"n":[],"c":[8,28,15,0]},"santa":{"n":[],"c":[8,29,15,0]},"fireworks":{"n":[],"c":[8,35,15,0]},"sparkler":{"n":[],"c":[8,36,15,0]},"balloon":{"n":[],"c":[8,37,15,0]},"tada":{"n":[],"c":[8,38,15,0]},"confetti_ball":{"n":[],"c":[8,39,15,0]},"tanabata_tree":{"n":[],"c":[8,40,15,0]},"crossed_flags":{"n":[],"c":[9,0,15,0]},"bamboo":{"n":[],"c":[9,1,15,0]},"dolls":{"n":[],"c":[9,2,15,0]},"flags":{"n":[],"c":[9,3,15,0]},"wind_chime":{"n":[],"c":[9,4,15,0]},"rice_scene":{"n":[],"c":[9,5,15,0]},"school_satchel":{"n":[],"c":[9,6,15,0]},"mortar_board":{"n":[],"c":[9,7,15,0]},"medal":{"n":[],"c":[9,8,15,0]},"reminder_ribbon":{"n":[],"c":[9,9,15,0]},"studio_microphone":{"n":[],"c":[9,10,15,0]},"level_slider":{"n":[],"c":[9,11,15,0]},"control_knobs":{"n":[],"c":[9,12,15,0]},"film_frames":{"n":[],"c":[9,13,15,0]},"admission_tickets":{"n":[],"c":[9,14,15,0]},"carousel_horse":{"n":[],"c":[9,15,15,0]},"ferris_wheel":{"n":[],"c":[9,16,15,0]},"roller_coaster":{"n":[],"c":[9,17,15,0]},"fishing_pole_and_fish":{"n":[],"c":[9,18,15,0]},"microphone":{"n":[],"c":[9,19,15,0]},"movie_camera":{"n":[],"c":[9,20,15,0]},"cinema":{"n":[],"c":[9,21,15,0]},"headphones":{"n":[],"c":[9,22,15,0]},"art":{"n":[],"c":[9,23,15,0]},"tophat":{"n":[],"c":[9,24,15,0]},"circus_tent":{"n":[],"c":[9,25,15,0]},"ticket":{"n":[],"c":[9,26,15,0]},"clapper":{"n":[],"c":[9,27,15,0]},"performing_arts":{"n":[],"c":[9,28,15,0]},"video_game":{"n":[],"c":[9,29,15,0]},"dart":{"n":[],"c":[9,30,15,0]},"slot_machine":{"n":[],"c":[9,31,15,0]},"8ball":{"n":[],"c":[9,32,15,0]},"game_die":{"n":[],"c":[9,33,15,0]},"bowling":{"n":[],"c":[9,34,15,0]},"flower_playing_cards":{"n":[],"c":[9,35,15,0]},"musical_note":{"n":[],"c":[9,36,15,0]},"notes":{"n":[],"c":[9,37,15,0]},"saxophone":{"n":[],"c":[9,38,15,0]},"guitar":{"n":[],"c":[9,39,15,0]},"musical_keyboard":{"n":[],"c":[9,40,15,0]},"trumpet":{"n":[],"c":[10,0,15,0]},"violin":{"n":[],"c":[10,1,15,0]},"musical_score":{"n":[],"c":[10,2,15,0]},"running_shirt_with_sash":{"n":[],"c":[10,3,15,0]},"tennis":{"n":[],"c":[10,4,15,0]},"ski":{"n":[],"c":[10,5,15,0]},"basketball":{"n":[],"c":[10,6,15,0]},"checkered_flag":{"n":[],"c":[10,7,15,0]},"snowboarder":{"n":[],"c":[10,8,15,0]},"runner":{"n":["running"],"c":[10,9,15,0]},"surfer":{"n":[],"c":[10,15,15,0]},"sports_medal":{"n":[],"c":[10,21,15,0]},"trophy":{"n":[],"c":[10,22,15,0]},"horse_racing":{"n":[],"c":[10,23,15,0]},"football":{"n":[],"c":[10,24,15,0]},"rugby_football":{"n":[],"c":[10,25,15,0]},"swimmer":{"n":[],"c":[10,26,15,0]},"weight_lifter":{"n":[],"c":[10,32,15,0]},"golfer":{"n":[],"c":[10,38,15,0]},"racing_motorcycle":{"n":[],"c":[10,39,15,0]},"racing_car":{"n":[],"c":[10,40,15,0]},"cricket_bat_and_ball":{"n":[],"c":[11,0,15,0]},"volleyball":{"n":[],"c":[11,1,15,0]},"field_hockey_stick_and_ball":{"n":[],"c":[11,2,15,0]},"ice_hockey_stick_and_puck":{"n":[],"c":[11,3,15,0]},"table_tennis_paddle_and_ball":{"n":[],"c":[11,4,15,0]},"snow_capped_mountain":{"n":[],"c":[11,5,15,0]},"camping":{"n":[],"c":[11,6,15,0]},"beach_with_umbrella":{"n":[],"c":[11,7,15,0]},"building_construction":{"n":[],"c":[11,8,15,0]},"house_buildings":{"n":[],"c":[11,9,15,0]},"cityscape":{"n":[],"c":[11,10,15,0]},"derelict_house_building":{"n":[],"c":[11,11,15,0]},"classical_building":{"n":[],"c":[11,12,15,0]},"desert":{"n":[],"c":[11,13,15,0]},"desert_island":{"n":[],"c":[11,14,15,0]},"national_park":{"n":[],"c":[11,15,15,0]},"stadium":{"n":[],"c":[11,16,15,0]},"house":{"n":[],"c":[11,17,15,0]},"house_with_garden":{"n":[],"c":[11,18,15,0]},"office":{"n":[],"c":[11,19,15,0]},"post_office":{"n":[],"c":[11,20,15,0]},"european_post_office":{"n":[],"c":[11,21,15,0]},"hospital":{"n":[],"c":[11,22,15,0]},"bank":{"n":[],"c":[11,23,15,0]},"atm":{"n":[],"c":[11,24,15,0]},"hotel":{"n":[],"c":[11,25,15,0]},"love_hotel":{"n":[],"c":[11,26,15,0]},"convenience_store":{"n":[],"c":[11,27,15,0]},"school":{"n":[],"c":[11,28,15,0]},"department_store":{"n":[],"c":[11,29,15,0]},"factory":{"n":[],"c":[11,30,15,0]},"izakaya_lantern":{"n":["lantern"],"c":[11,31,15,0]},"japanese_castle":{"n":[],"c":[11,32,15,0]},"european_castle":{"n":[],"c":[11,33,15,0]},"waving_white_flag":{"n":[],"c":[11,34,15,0]},"waving_black_flag":{"n":[],"c":[11,35,15,0]},"rosette":{"n":[],"c":[11,36,15,0]},"label":{"n":[],"c":[11,37,15,0]},"badminton_racquet_and_shuttlecock":{"n":[],"c":[11,38,15,0]},"bow_and_arrow":{"n":[],"c":[11,39,15,0]},"amphora":{"n":[],"c":[11,40,15,0]},"skin-tone-2":{"n":[],"c":[12,0,15,0]},"skin-tone-3":{"n":[],"c":[12,1,15,0]},"skin-tone-4":{"n":[],"c":[12,2,15,0]},"skin-tone-5":{"n":[],"c":[12,3,15,0]},"skin-tone-6":{"n":[],"c":[12,4,15,0]},"rat":{"n":[],"c":[12,5,15,0]},"mouse2":{"n":[],"c":[12,6,15,0]},"ox":{"n":[],"c":[12,7,15,0]},"water_buffalo":{"n":[],"c":[12,8,15,0]},"cow2":{"n":[],"c":[12,9,15,0]},"tiger2":{"n":[],"c":[12,10,15,0]},"leopard":{"n":[],"c":[12,11,15,0]},"rabbit2":{"n":[],"c":[12,12,15,0]},"cat2":{"n":[],"c":[12,13,15,0]},"dragon":{"n":[],"c":[12,14,15,0]},"crocodile":{"n":[],"c":[12,15,15,0]},"whale2":{"n":[],"c":[12,16,15,0]},"snail":{"n":[],"c":[12,17,15,0]},"snake":{"n":[],"c":[12,18,15,0]},"racehorse":{"n":[],"c":[12,19,15,0]},"ram":{"n":[],"c":[12,20,15,0]},"goat":{"n":[],"c":[12,21,15,0]},"sheep":{"n":[],"c":[12,22,15,0]},"monkey":{"n":[],"c":[12,23,15,0]},"rooster":{"n":[],"c":[12,24,15,0]},"chicken":{"n":[],"c":[12,25,15,0]},"dog2":{"n":[],"c":[12,26,15,0]},"pig2":{"n":[],"c":[12,27,15,0]},"boar":{"n":[],"c":[12,28,15,0]},"elephant":{"n":[],"c":[12,29,15,0]},"octopus":{"n":[],"c":[12,30,15,0]},"shell":{"n":[],"c":[12,31,15,0]},"bug":{"n":[],"c":[12,32,15,0]},"ant":{"n":[],"c":[12,33,15,0]},"bee":{"n":["honeybee"],"c":[12,34,15,0]},"beetle":{"n":[],"c":[12,35,15,0]},"fish":{"n":[],"c":[12,36,15,0]},"tropical_fish":{"n":[],"c":[12,37,15,0]},"blowfish":{"n":[],"c":[12,38,15,0]},"turtle":{"n":[],"c":[12,39,15,0]},"hatching_chick":{"n":[],"c":[12,40,15,0]},"baby_chick":{"n":[],"c":[13,0,15,0]},"hatched_chick":{"n":[],"c":[13,1,15,0]},"bird":{"n":[],"c":[13,2,15,0]},"penguin":{"n":[],"c":[13,3,15,0]},"koala":{"n":[],"c":[13,4,15,0]},"poodle":{"n":[],"c":[13,5,15,0]},"dromedary_camel":{"n":[],"c":[13,6,15,0]},"camel":{"n":[],"c":[13,7,15,0]},"dolphin":{"n":["flipper"],"c":[13,8,15,0]},"mouse":{"n":[],"c":[13,9,15,0]},"cow":{"n":[],"c":[13,10,15,0]},"tiger":{"n":[],"c":[13,11,15,0]},"rabbit":{"n":[],"c":[13,12,15,0]},"cat":{"n":[],"c":[13,13,15,0]},"dragon_face":{"n":[],"c":[13,14,15,0]},"whale":{"n":[],"c":[13,15,15,0]},"horse":{"n":[],"c":[13,16,15,0]},"monkey_face":{"n":[],"c":[13,17,15,0]},"dog":{"n":[],"c":[13,18,15,0]},"pig":{"n":[],"c":[13,19,15,0]},"frog":{"n":[],"c":[13,20,15,0]},"hamster":{"n":[],"c":[13,21,15,0]},"wolf":{"n":[],"c":[13,22,15,0]},"bear":{"n":[],"c":[13,23,15,0]},"panda_face":{"n":[],"c":[13,24,15,0]},"pig_nose":{"n":[],"c":[13,25,15,0]},"feet":{"n":["paw_prints"],"c":[13,26,15,0]},"chipmunk":{"n":[],"c":[13,27,15,0]},"eyes":{"n":[],"c":[13,28,15,0]},"eye":{"n":[],"c":[13,29,15,0]},"ear":{"n":[],"c":[13,30,15,0]},"nose":{"n":[],"c":[13,36,15,0]},"lips":{"n":[],"c":[14,1,15,0]},"tongue":{"n":[],"c":[14,2,15,0]},"point_up_2":{"n":[],"c":[14,3,15,0]},"point_down":{"n":[],"c":[14,9,15,0]},"point_left":{"n":[],"c":[14,15,15,0]},"point_right":{"n":[],"c":[14,21,15,0]},"facepunch":{"n":["punch"],"c":[14,27,15,0]},"wave":{"n":[],"c":[14,33,15,0]},"ok_hand":{"n":[],"c":[14,39,15,0]},"+1":{"n":["thumbsup"],"c":[15,4,15,0]},"-1":{"n":["thumbsdown"],"c":[15,10,15,0]},"clap":{"n":[],"c":[15,16,15,0]},"open_hands":{"n":[],"c":[15,22,15,0]},"crown":{"n":[],"c":[15,28,15,0]},"womans_hat":{"n":[],"c":[15,29,15,0]},"eyeglasses":{"n":[],"c":[15,30,15,0]},"necktie":{"n":[],"c":[15,31,15,0]},"shirt":{"n":["tshirt"],"c":[15,32,15,0]},"jeans":{"n":[],"c":[15,33,15,0]},"dress":{"n":[],"c":[15,34,15,0]},"kimono":{"n":[],"c":[15,35,15,0]},"bikini":{"n":[],"c":[15,36,15,0]},"womans_clothes":{"n":[],"c":[15,37,15,0]},"purse":{"n":[],"c":[15,38,15,0]},"handbag":{"n":[],"c":[15,39,15,0]},"pouch":{"n":[],"c":[15,40,15,0]},"mans_shoe":{"n":["shoe"],"c":[16,0,15,0]},"athletic_shoe":{"n":[],"c":[16,1,15,0]},"high_heel":{"n":[],"c":[16,2,15,0]},"sandal":{"n":[],"c":[16,3,15,0]},"boot":{"n":[],"c":[16,4,15,0]},"footprints":{"n":[],"c":[16,5,15,0]},"bust_in_silhouette":{"n":[],"c":[16,6,15,0]},"busts_in_silhouette":{"n":[],"c":[16,7,15,0]},"boy":{"n":[],"c":[16,8,15,0]},"girl":{"n":[],"c":[16,14,15,0]},"man":{"n":[],"c":[16,20,15,0]},"woman":{"n":[],"c":[16,26,15,0]},"family":{"n":["man-woman-boy"],"c":[16,32,15,0]},"couple":{"n":["man_and_woman_holding_hands"],"c":[16,33,15,0]},"two_men_holding_hands":{"n":[],"c":[16,34,15,0]},"two_women_holding_hands":{"n":[],"c":[16,35,15,0]},"cop":{"n":[],"c":[16,36,15,0]},"dancers":{"n":[],"c":[17,1,15,0]},"bride_with_veil":{"n":[],"c":[17,2,15,0]},"person_with_blond_hair":{"n":[],"c":[17,8,15,0]},"man_with_gua_pi_mao":{"n":[],"c":[17,14,15,0]},"man_with_turban":{"n":[],"c":[17,20,15,0]},"older_man":{"n":[],"c":[17,26,15,0]},"older_woman":{"n":[],"c":[17,32,15,0]},"baby":{"n":[],"c":[17,38,15,0]},"construction_worker":{"n":[],"c":[18,3,15,0]},"princess":{"n":[],"c":[18,9,15,0]},"japanese_ogre":{"n":[],"c":[18,15,15,0]},"japanese_goblin":{"n":[],"c":[18,16,15,0]},"ghost":{"n":[],"c":[18,17,15,0]},"angel":{"n":[],"c":[18,18,15,0]},"alien":{"n":[],"c":[18,24,15,0]},"space_invader":{"n":[],"c":[18,25,15,0]},"imp":{"n":[],"c":[18,26,15,0]},"skull":{"n":[],"c":[18,27,15,0]},"information_desk_person":{"n":[],"c":[18,28,15,0]},"guardsman":{"n":[],"c":[18,34,15,0]},"dancer":{"n":[],"c":[18,40,15,0]},"lipstick":{"n":[],"c":[19,5,15,0]},"nail_care":{"n":[],"c":[19,6,15,0]},"massage":{"n":[],"c":[19,12,15,0]},"haircut":{"n":[],"c":[19,18,15,0]},"barber":{"n":[],"c":[19,24,15,0]},"syringe":{"n":[],"c":[19,25,15,0]},"pill":{"n":[],"c":[19,26,15,0]},"kiss":{"n":[],"c":[19,27,15,0]},"love_letter":{"n":[],"c":[19,28,15,0]},"ring":{"n":[],"c":[19,29,15,0]},"gem":{"n":[],"c":[19,30,15,0]},"couplekiss":{"n":[],"c":[19,31,15,0]},"bouquet":{"n":[],"c":[19,32,15,0]},"couple_with_heart":{"n":[],"c":[19,33,15,0]},"wedding":{"n":[],"c":[19,34,15,0]},"heartbeat":{"n":[],"c":[19,35,15,0]},"broken_heart":{"n":[],"c":[19,36,15,0,"</3"]},"two_hearts":{"n":[],"c":[19,37,15,0]},"sparkling_heart":{"n":[],"c":[19,38,15,0]},"heartpulse":{"n":[],"c":[19,39,15,0]},"cupid":{"n":[],"c":[19,40,15,0]},"blue_heart":{"n":[],"c":[20,0,15,0,"<3"]},"green_heart":{"n":[],"c":[20,1,15,0,"<3"]},"yellow_heart":{"n":[],"c":[20,2,15,0,"<3"]},"purple_heart":{"n":[],"c":[20,3,15,0,"<3"]},"gift_heart":{"n":[],"c":[20,4,15,0]},"revolving_hearts":{"n":[],"c":[20,5,15,0]},"heart_decoration":{"n":[],"c":[20,6,15,0]},"diamond_shape_with_a_dot_inside":{"n":[],"c":[20,7,15,0]},"bulb":{"n":[],"c":[20,8,15,0]},"anger":{"n":[],"c":[20,9,15,0]},"bomb":{"n":[],"c":[20,10,15,0]},"zzz":{"n":[],"c":[20,11,15,0]},"boom":{"n":["collision"],"c":[20,12,15,0]},"sweat_drops":{"n":[],"c":[20,13,15,0]},"droplet":{"n":[],"c":[20,14,15,0]},"dash":{"n":[],"c":[20,15,15,0]},"hankey":{"n":["poop","shit"],"c":[20,16,15,0]},"muscle":{"n":[],"c":[20,17,15,0]},"dizzy":{"n":[],"c":[20,23,15,0]},"speech_balloon":{"n":[],"c":[20,24,15,0]},"thought_balloon":{"n":[],"c":[20,25,15,0]},"white_flower":{"n":[],"c":[20,26,15,0]},"100":{"n":[],"c":[20,27,15,0]},"moneybag":{"n":[],"c":[20,28,15,0]},"currency_exchange":{"n":[],"c":[20,29,15,0]},"heavy_dollar_sign":{"n":[],"c":[20,30,15,0]},"credit_card":{"n":[],"c":[20,31,15,0]},"yen":{"n":[],"c":[20,32,15,0]},"dollar":{"n":[],"c":[20,33,15,0]},"euro":{"n":[],"c":[20,34,15,0]},"pound":{"n":[],"c":[20,35,15,0]},"money_with_wings":{"n":[],"c":[20,36,15,0]},"chart":{"n":[],"c":[20,37,15,0]},"seat":{"n":[],"c":[20,38,15,0]},"computer":{"n":[],"c":[20,39,15,0]},"briefcase":{"n":[],"c":[20,40,15,0]},"minidisc":{"n":[],"c":[21,0,15,0]},"floppy_disk":{"n":[],"c":[21,1,15,0]},"cd":{"n":[],"c":[21,2,15,0]},"dvd":{"n":[],"c":[21,3,15,0]},"file_folder":{"n":[],"c":[21,4,15,0]},"open_file_folder":{"n":[],"c":[21,5,15,0]},"page_with_curl":{"n":[],"c":[21,6,15,0]},"page_facing_up":{"n":[],"c":[21,7,15,0]},"date":{"n":[],"c":[21,8,15,0]},"calendar":{"n":[],"c":[21,9,15,0]},"card_index":{"n":[],"c":[21,10,15,0]},"chart_with_upwards_trend":{"n":[],"c":[21,11,15,0]},"chart_with_downwards_trend":{"n":[],"c":[21,12,15,0]},"bar_chart":{"n":[],"c":[21,13,15,0]},"clipboard":{"n":[],"c":[21,14,15,0]},"pushpin":{"n":[],"c":[21,15,15,0]},"round_pushpin":{"n":[],"c":[21,16,15,0]},"paperclip":{"n":[],"c":[21,17,15,0]},"straight_ruler":{"n":[],"c":[21,18,15,0]},"triangular_ruler":{"n":[],"c":[21,19,15,0]},"bookmark_tabs":{"n":[],"c":[21,20,15,0]},"ledger":{"n":[],"c":[21,21,15,0]},"notebook":{"n":[],"c":[21,22,15,0]},"notebook_with_decorative_cover":{"n":[],"c":[21,23,15,0]},"closed_book":{"n":[],"c":[21,24,15,0]},"book":{"n":["open_book"],"c":[21,25,15,0]},"green_book":{"n":[],"c":[21,26,15,0]},"blue_book":{"n":[],"c":[21,27,15,0]},"orange_book":{"n":[],"c":[21,28,15,0]},"books":{"n":[],"c":[21,29,15,0]},"name_badge":{"n":[],"c":[21,30,15,0]},"scroll":{"n":[],"c":[21,31,15,0]},"memo":{"n":["pencil"],"c":[21,32,15,0]},"telephone_receiver":{"n":[],"c":[21,33,15,0]},"pager":{"n":[],"c":[21,34,15,0]},"fax":{"n":[],"c":[21,35,15,0]},"satellite_antenna":{"n":[],"c":[21,36,15,0]},"loudspeaker":{"n":[],"c":[21,37,15,0]},"mega":{"n":[],"c":[21,38,15,0]},"outbox_tray":{"n":[],"c":[21,39,15,0]},"inbox_tray":{"n":[],"c":[21,40,15,0]},"package":{"n":[],"c":[22,0,15,0]},"e-mail":{"n":[],"c":[22,1,15,0]},"incoming_envelope":{"n":[],"c":[22,2,15,0]},"envelope_with_arrow":{"n":[],"c":[22,3,15,0]},"mailbox_closed":{"n":[],"c":[22,4,15,0]},"mailbox":{"n":[],"c":[22,5,15,0]},"mailbox_with_mail":{"n":[],"c":[22,6,15,0]},"mailbox_with_no_mail":{"n":[],"c":[22,7,15,0]},"postbox":{"n":[],"c":[22,8,15,0]},"postal_horn":{"n":[],"c":[22,9,15,0]},"newspaper":{"n":[],"c":[22,10,15,0]},"iphone":{"n":[],"c":[22,11,15,0]},"calling":{"n":[],"c":[22,12,15,0]},"vibration_mode":{"n":[],"c":[22,13,15,0]},"mobile_phone_off":{"n":[],"c":[22,14,15,0]},"no_mobile_phones":{"n":[],"c":[22,15,15,0]},"signal_strength":{"n":[],"c":[22,16,15,0]},"camera":{"n":[],"c":[22,17,15,0]},"camera_with_flash":{"n":[],"c":[22,18,15,0]},"video_camera":{"n":[],"c":[22,19,15,0]},"tv":{"n":[],"c":[22,20,15,0]},"radio":{"n":[],"c":[22,21,15,0]},"vhs":{"n":[],"c":[22,22,15,0]},"film_projector":{"n":[],"c":[22,23,15,0]},"prayer_beads":{"n":[],"c":[22,24,15,0]},"twisted_rightwards_arrows":{"n":[],"c":[22,25,15,0]},"repeat":{"n":[],"c":[22,26,15,0]},"repeat_one":{"n":[],"c":[22,27,15,0]},"arrows_clockwise":{"n":[],"c":[22,28,15,0]},"arrows_counterclockwise":{"n":[],"c":[22,29,15,0]},"low_brightness":{"n":[],"c":[22,30,15,0]},"high_brightness":{"n":[],"c":[22,31,15,0]},"mute":{"n":[],"c":[22,32,15,0]},"speaker":{"n":[],"c":[22,33,15,0]},"sound":{"n":[],"c":[22,34,15,0]},"loud_sound":{"n":[],"c":[22,35,15,0]},"battery":{"n":[],"c":[22,36,15,0]},"electric_plug":{"n":[],"c":[22,37,15,0]},"mag":{"n":[],"c":[22,38,15,0]},"mag_right":{"n":[],"c":[22,39,15,0]},"lock_with_ink_pen":{"n":[],"c":[22,40,15,0]},"closed_lock_with_key":{"n":[],"c":[23,0,15,0]},"key":{"n":[],"c":[23,1,15,0]},"lock":{"n":[],"c":[23,2,15,0]},"unlock":{"n":[],"c":[23,3,15,0]},"bell":{"n":[],"c":[23,4,15,0]},"no_bell":{"n":[],"c":[23,5,15,0]},"bookmark":{"n":[],"c":[23,6,15,0]},"link":{"n":[],"c":[23,7,15,0]},"radio_button":{"n":[],"c":[23,8,15,0]},"back":{"n":[],"c":[23,9,15,0]},"end":{"n":[],"c":[23,10,15,0]},"on":{"n":[],"c":[23,11,15,0]},"soon":{"n":[],"c":[23,12,15,0]},"top":{"n":[],"c":[23,13,15,0]},"underage":{"n":[],"c":[23,14,15,0]},"keycap_ten":{"n":[],"c":[23,15,15,0]},"capital_abcd":{"n":[],"c":[23,16,15,0]},"abcd":{"n":[],"c":[23,17,15,0]},"1234":{"n":[],"c":[23,18,15,0]},"symbols":{"n":[],"c":[23,19,15,0]},"abc":{"n":[],"c":[23,20,15,0]},"fire":{"n":[],"c":[23,21,15,0]},"flashlight":{"n":[],"c":[23,22,15,0]},"wrench":{"n":[],"c":[23,23,15,0]},"hammer":{"n":[],"c":[23,24,15,0]},"nut_and_bolt":{"n":[],"c":[23,25,15,0]},"hocho":{"n":["knife"],"c":[23,26,15,0]},"gun":{"n":[],"c":[23,27,15,0]},"microscope":{"n":[],"c":[23,28,15,0]},"telescope":{"n":[],"c":[23,29,15,0]},"crystal_ball":{"n":[],"c":[23,30,15,0]},"six_pointed_star":{"n":[],"c":[23,31,15,0]},"beginner":{"n":[],"c":[23,32,15,0]},"trident":{"n":[],"c":[23,33,15,0]},"black_square_button":{"n":[],"c":[23,34,15,0]},"white_square_button":{"n":[],"c":[23,35,15,0]},"red_circle":{"n":[],"c":[23,36,15,0]},"large_blue_circle":{"n":[],"c":[23,37,15,0]},"large_orange_diamond":{"n":[],"c":[23,38,15,0]},"large_blue_diamond":{"n":[],"c":[23,39,15,0]},"small_orange_diamond":{"n":[],"c":[23,40,15,0]},"small_blue_diamond":{"n":[],"c":[24,0,15,0]},"small_red_triangle":{"n":[],"c":[24,1,15,0]},"small_red_triangle_down":{"n":[],"c":[24,2,15,0]},"arrow_up_small":{"n":[],"c":[24,3,15,0]},"arrow_down_small":{"n":[],"c":[24,4,15,0]},"om_symbol":{"n":[],"c":[24,5,15,0]},"dove_of_peace":{"n":[],"c":[24,6,15,0]},"kaaba":{"n":[],"c":[24,7,15,0]},"mosque":{"n":[],"c":[24,8,15,0]},"synagogue":{"n":[],"c":[24,9,15,0]},"menorah_with_nine_branches":{"n":[],"c":[24,10,15,0]},"clock1":{"n":[],"c":[24,11,15,0]},"clock2":{"n":[],"c":[24,12,15,0]},"clock3":{"n":[],"c":[24,13,15,0]},"clock4":{"n":[],"c":[24,14,15,0]},"clock5":{"n":[],"c":[24,15,15,0]},"clock6":{"n":[],"c":[24,16,15,0]},"clock7":{"n":[],"c":[24,17,15,0]},"clock8":{"n":[],"c":[24,18,15,0]},"clock9":{"n":[],"c":[24,19,15,0]},"clock10":{"n":[],"c":[24,20,15,0]},"clock11":{"n":[],"c":[24,21,15,0]},"clock12":{"n":[],"c":[24,22,15,0]},"clock130":{"n":[],"c":[24,23,15,0]},"clock230":{"n":[],"c":[24,24,15,0]},"clock330":{"n":[],"c":[24,25,15,0]},"clock430":{"n":[],"c":[24,26,15,0]},"clock530":{"n":[],"c":[24,27,15,0]},"clock630":{"n":[],"c":[24,28,15,0]},"clock730":{"n":[],"c":[24,29,15,0]},"clock830":{"n":[],"c":[24,30,15,0]},"clock930":{"n":[],"c":[24,31,15,0]},"clock1030":{"n":[],"c":[24,32,15,0]},"clock1130":{"n":[],"c":[24,33,15,0]},"clock1230":{"n":[],"c":[24,34,15,0]},"candle":{"n":[],"c":[24,35,15,0]},"mantelpiece_clock":{"n":[],"c":[24,36,15,0]},"hole":{"n":[],"c":[24,37,15,0]},"man_in_business_suit_levitating":{"n":[],"c":[24,38,15,0]},"sleuth_or_spy":{"n":[],"c":[24,39,15,0]},"dark_sunglasses":{"n":[],"c":[25,4,15,0]},"spider":{"n":[],"c":[25,5,15,0]},"spider_web":{"n":[],"c":[25,6,15,0]},"joystick":{"n":[],"c":[25,7,15,0]},"linked_paperclips":{"n":[],"c":[25,8,15,0]},"lower_left_ballpoint_pen":{"n":[],"c":[25,9,15,0]},"lower_left_fountain_pen":{"n":[],"c":[25,10,15,0]},"lower_left_paintbrush":{"n":[],"c":[25,11,15,0]},"lower_left_crayon":{"n":[],"c":[25,12,15,0]},"raised_hand_with_fingers_splayed":{"n":[],"c":[25,13,15,0]},"middle_finger":{"n":["reversed_hand_with_middle_finger_extended"],"c":[25,19,15,0]},"spock-hand":{"n":[],"c":[25,25,15,0]},"desktop_computer":{"n":[],"c":[25,31,15,0]},"printer":{"n":[],"c":[25,32,15,0]},"three_button_mouse":{"n":[],"c":[25,33,15,0]},"trackball":{"n":[],"c":[25,34,15,0]},"frame_with_picture":{"n":[],"c":[25,35,15,0]},"card_index_dividers":{"n":[],"c":[25,36,15,0]},"card_file_box":{"n":[],"c":[25,37,15,0]},"file_cabinet":{"n":[],"c":[25,38,15,0]},"wastebasket":{"n":[],"c":[25,39,15,0]},"spiral_note_pad":{"n":[],"c":[25,40,15,0]},"spiral_calendar_pad":{"n":[],"c":[26,0,15,0]},"compression":{"n":[],"c":[26,1,15,0]},"old_key":{"n":[],"c":[26,2,15,0]},"rolled_up_newspaper":{"n":[],"c":[26,3,15,0]},"dagger_knife":{"n":[],"c":[26,4,15,0]},"speaking_head_in_silhouette":{"n":[],"c":[26,5,15,0]},"left_speech_bubble":{"n":[],"c":[26,6,7,0]},"right_anger_bubble":{"n":[],"c":[26,7,15,0]},"ballot_box_with_ballot":{"n":[],"c":[26,8,15,0]},"world_map":{"n":[],"c":[26,9,15,0]},"mount_fuji":{"n":[],"c":[26,10,15,0]},"tokyo_tower":{"n":[],"c":[26,11,15,0]},"statue_of_liberty":{"n":[],"c":[26,12,15,0]},"japan":{"n":[],"c":[26,13,15,0]},"moyai":{"n":[],"c":[26,14,15,0]},"grinning":{"n":[],"c":[26,15,15,0,":D"]},"grin":{"n":[],"c":[26,16,15,0]},"joy":{"n":[],"c":[26,17,15,0]},"smiley":{"n":[],"c":[26,18,15,0,":)"]},"smile":{"n":[],"c":[26,19,15,0,":)"]},"sweat_smile":{"n":[],"c":[26,20,15,0]},"laughing":{"n":["satisfied"],"c":[26,21,15,0]},"innocent":{"n":[],"c":[26,22,15,0]},"smiling_imp":{"n":[],"c":[26,23,15,0]},"wink":{"n":[],"c":[26,24,15,0,";)"]},"blush":{"n":[],"c":[26,25,15,0,":)"]},"yum":{"n":[],"c":[26,26,15,0]},"relieved":{"n":[],"c":[26,27,15,0]},"heart_eyes":{"n":[],"c":[26,28,15,0]},"sunglasses":{"n":[],"c":[26,29,15,0]},"smirk":{"n":[],"c":[26,30,15,0]},"neutral_face":{"n":[],"c":[26,31,15,0]},"expressionless":{"n":[],"c":[26,32,15,0]},"unamused":{"n":[],"c":[26,33,15,0,":("]},"sweat":{"n":[],"c":[26,34,15,0]},"pensive":{"n":[],"c":[26,35,15,0]},"confused":{"n":[],"c":[26,36,15,0]},"confounded":{"n":[],"c":[26,37,15,0]},"kissing":{"n":[],"c":[26,38,15,0]},"kissing_heart":{"n":[],"c":[26,39,15,0]},"kissing_smiling_eyes":{"n":[],"c":[26,40,15,0]},"kissing_closed_eyes":{"n":[],"c":[27,0,15,0]},"stuck_out_tongue":{"n":[],"c":[27,1,15,0,":p"]},"stuck_out_tongue_winking_eye":{"n":[],"c":[27,2,15,0,";p"]},"stuck_out_tongue_closed_eyes":{"n":[],"c":[27,3,15,0]},"disappointed":{"n":[],"c":[27,4,15,0,":("]},"worried":{"n":[],"c":[27,5,15,0]},"angry":{"n":[],"c":[27,6,15,0]},"rage":{"n":[],"c":[27,7,15,0]},"cry":{"n":[],"c":[27,8,15,0,":'("]},"persevere":{"n":[],"c":[27,9,15,0]},"triumph":{"n":[],"c":[27,10,15,0]},"disappointed_relieved":{"n":[],"c":[27,11,15,0]},"frowning":{"n":[],"c":[27,12,15,0]},"anguished":{"n":[],"c":[27,13,15,0]},"fearful":{"n":[],"c":[27,14,15,0]},"weary":{"n":[],"c":[27,15,15,0]},"sleepy":{"n":[],"c":[27,16,15,0]},"tired_face":{"n":[],"c":[27,17,15,0]},"grimacing":{"n":[],"c":[27,18,15,0]},"sob":{"n":[],"c":[27,19,15,0,":'("]},"open_mouth":{"n":[],"c":[27,20,15,0]},"hushed":{"n":[],"c":[27,21,15,0]},"cold_sweat":{"n":[],"c":[27,22,15,0]},"scream":{"n":[],"c":[27,23,15,0]},"astonished":{"n":[],"c":[27,24,15,0]},"flushed":{"n":[],"c":[27,25,15,0]},"sleeping":{"n":[],"c":[27,26,15,0]},"dizzy_face":{"n":[],"c":[27,27,15,0]},"no_mouth":{"n":[],"c":[27,28,15,0]},"mask":{"n":[],"c":[27,29,15,0]},"smile_cat":{"n":[],"c":[27,30,15,0]},"joy_cat":{"n":[],"c":[27,31,15,0]},"smiley_cat":{"n":[],"c":[27,32,15,0]},"heart_eyes_cat":{"n":[],"c":[27,33,15,0]},"smirk_cat":{"n":[],"c":[27,34,15,0]},"kissing_cat":{"n":[],"c":[27,35,15,0]},"pouting_cat":{"n":[],"c":[27,36,15,0]},"crying_cat_face":{"n":[],"c":[27,37,15,0]},"scream_cat":{"n":[],"c":[27,38,15,0]},"slightly_frowning_face":{"n":[],"c":[27,39,15,0]},"slightly_smiling_face":{"n":[],"c":[27,40,15,0]},"upside_down_face":{"n":[],"c":[28,0,15,0]},"face_with_rolling_eyes":{"n":[],"c":[28,1,15,0]},"no_good":{"n":[],"c":[28,2,15,0]},"ok_woman":{"n":[],"c":[28,8,15,0]},"bow":{"n":[],"c":[28,14,15,0]},"see_no_evil":{"n":[],"c":[28,20,15,0]},"hear_no_evil":{"n":[],"c":[28,21,15,0]},"speak_no_evil":{"n":[],"c":[28,22,15,0]},"raising_hand":{"n":[],"c":[28,23,15,0]},"raised_hands":{"n":[],"c":[28,29,15,0]},"person_frowning":{"n":[],"c":[28,35,15,0]},"person_with_pouting_face":{"n":[],"c":[29,0,15,0]},"pray":{"n":[],"c":[29,6,15,0]},"rocket":{"n":[],"c":[29,12,15,0]},"helicopter":{"n":[],"c":[29,13,15,0]},"steam_locomotive":{"n":[],"c":[29,14,15,0]},"railway_car":{"n":[],"c":[29,15,15,0]},"bullettrain_side":{"n":[],"c":[29,16,15,0]},"bullettrain_front":{"n":[],"c":[29,17,15,0]},"train2":{"n":[],"c":[29,18,15,0]},"metro":{"n":[],"c":[29,19,15,0]},"light_rail":{"n":[],"c":[29,20,15,0]},"station":{"n":[],"c":[29,21,15,0]},"tram":{"n":[],"c":[29,22,15,0]},"train":{"n":[],"c":[29,23,15,0]},"bus":{"n":[],"c":[29,24,15,0]},"oncoming_bus":{"n":[],"c":[29,25,15,0]},"trolleybus":{"n":[],"c":[29,26,15,0]},"busstop":{"n":[],"c":[29,27,15,0]},"minibus":{"n":[],"c":[29,28,15,0]},"ambulance":{"n":[],"c":[29,29,15,0]},"fire_engine":{"n":[],"c":[29,30,15,0]},"police_car":{"n":[],"c":[29,31,15,0]},"oncoming_police_car":{"n":[],"c":[29,32,15,0]},"taxi":{"n":[],"c":[29,33,15,0]},"oncoming_taxi":{"n":[],"c":[29,34,15,0]},"car":{"n":["red_car"],"c":[29,35,15,0]},"oncoming_automobile":{"n":[],"c":[29,36,15,0]},"blue_car":{"n":[],"c":[29,37,15,0]},"truck":{"n":[],"c":[29,38,15,0]},"articulated_lorry":{"n":[],"c":[29,39,15,0]},"tractor":{"n":[],"c":[29,40,15,0]},"monorail":{"n":[],"c":[30,0,15,0]},"mountain_railway":{"n":[],"c":[30,1,15,0]},"suspension_railway":{"n":[],"c":[30,2,15,0]},"mountain_cableway":{"n":[],"c":[30,3,15,0]},"aerial_tramway":{"n":[],"c":[30,4,15,0]},"ship":{"n":[],"c":[30,5,15,0]},"rowboat":{"n":[],"c":[30,6,15,0]},"speedboat":{"n":[],"c":[30,12,15,0]},"traffic_light":{"n":[],"c":[30,13,15,0]},"vertical_traffic_light":{"n":[],"c":[30,14,15,0]},"construction":{"n":[],"c":[30,15,15,0]},"rotating_light":{"n":[],"c":[30,16,15,0]},"triangular_flag_on_post":{"n":[],"c":[30,17,15,0]},"door":{"n":[],"c":[30,18,15,0]},"no_entry_sign":{"n":[],"c":[30,19,15,0]},"smoking":{"n":[],"c":[30,20,15,0]},"no_smoking":{"n":[],"c":[30,21,15,0]},"put_litter_in_its_place":{"n":[],"c":[30,22,15,0]},"do_not_litter":{"n":[],"c":[30,23,15,0]},"potable_water":{"n":[],"c":[30,24,15,0]},"non-potable_water":{"n":[],"c":[30,25,15,0]},"bike":{"n":[],"c":[30,26,15,0]},"no_bicycles":{"n":[],"c":[30,27,15,0]},"bicyclist":{"n":[],"c":[30,28,15,0]},"mountain_bicyclist":{"n":[],"c":[30,34,15,0]},"walking":{"n":[],"c":[30,40,15,0]},"no_pedestrians":{"n":[],"c":[31,5,15,0]},"children_crossing":{"n":[],"c":[31,6,15,0]},"mens":{"n":[],"c":[31,7,15,0]},"womens":{"n":[],"c":[31,8,15,0]},"restroom":{"n":[],"c":[31,9,15,0]},"baby_symbol":{"n":[],"c":[31,10,15,0]},"toilet":{"n":[],"c":[31,11,15,0]},"wc":{"n":[],"c":[31,12,15,0]},"shower":{"n":[],"c":[31,13,15,0]},"bath":{"n":[],"c":[31,14,15,0]},"bathtub":{"n":[],"c":[31,20,15,0]},"passport_control":{"n":[],"c":[31,21,15,0]},"customs":{"n":[],"c":[31,22,15,0]},"baggage_claim":{"n":[],"c":[31,23,15,0]},"left_luggage":{"n":[],"c":[31,24,15,0]},"couch_and_lamp":{"n":[],"c":[31,25,15,0]},"sleeping_accommodation":{"n":[],"c":[31,26,15,0]},"shopping_bags":{"n":[],"c":[31,27,15,0]},"bellhop_bell":{"n":[],"c":[31,28,15,0]},"bed":{"n":[],"c":[31,29,15,0]},"place_of_worship":{"n":[],"c":[31,30,15,0]},"hammer_and_wrench":{"n":[],"c":[31,31,15,0]},"shield":{"n":[],"c":[31,32,15,0]},"oil_drum":{"n":[],"c":[31,33,15,0]},"motorway":{"n":[],"c":[31,34,15,0]},"railway_track":{"n":[],"c":[31,35,15,0]},"motor_boat":{"n":[],"c":[31,36,15,0]},"small_airplane":{"n":[],"c":[31,37,15,0]},"airplane_departure":{"n":[],"c":[31,38,15,0]},"airplane_arriving":{"n":[],"c":[31,39,15,0]},"satellite":{"n":[],"c":[31,40,15,0]},"passenger_ship":{"n":[],"c":[32,0,15,0]},"zipper_mouth_face":{"n":[],"c":[32,1,15,0]},"money_mouth_face":{"n":[],"c":[32,2,15,0]},"face_with_thermometer":{"n":[],"c":[32,3,15,0]},"nerd_face":{"n":[],"c":[32,4,15,0]},"thinking_face":{"n":[],"c":[32,5,15,0]},"face_with_head_bandage":{"n":[],"c":[32,6,15,0]},"robot_face":{"n":[],"c":[32,7,15,0]},"hugging_face":{"n":[],"c":[32,8,15,0]},"the_horns":{"n":["sign_of_the_horns"],"c":[32,9,15,0]},"crab":{"n":[],"c":[32,15,15,0]},"lion_face":{"n":[],"c":[32,16,15,0]},"scorpion":{"n":[],"c":[32,17,15,0]},"turkey":{"n":[],"c":[32,18,15,0]},"unicorn_face":{"n":[],"c":[32,19,15,0]},"cheese_wedge":{"n":[],"c":[32,20,15,0]},"hash":{"n":[],"c":[32,21,15,0]},"keycap_star":{"n":[],"c":[32,22,15,0]},"zero":{"n":[],"c":[32,23,15,0]},"one":{"n":[],"c":[32,24,15,0]},"two":{"n":[],"c":[32,25,15,0]},"three":{"n":[],"c":[32,26,15,0]},"four":{"n":[],"c":[32,27,15,0]},"five":{"n":[],"c":[32,28,15,0]},"six":{"n":[],"c":[32,29,15,0]},"seven":{"n":[],"c":[32,30,15,0]},"eight":{"n":[],"c":[32,31,15,0]},"nine":{"n":[],"c":[32,32,15,0]},"flag-ac":{"n":[],"c":[32,33,15,0]},"flag-ad":{"n":[],"c":[32,34,15,0]},"flag-ae":{"n":[],"c":[32,35,15,0]},"flag-af":{"n":[],"c":[32,36,15,0]},"flag-ag":{"n":[],"c":[32,37,15,0]},"flag-ai":{"n":[],"c":[32,38,15,0]},"flag-al":{"n":[],"c":[32,39,15,0]},"flag-am":{"n":[],"c":[32,40,15,0]},"flag-ao":{"n":[],"c":[33,0,15,0]},"flag-aq":{"n":[],"c":[33,1,15,0]},"flag-ar":{"n":[],"c":[33,2,15,0]},"flag-as":{"n":[],"c":[33,3,15,0]},"flag-at":{"n":[],"c":[33,4,15,0]},"flag-au":{"n":[],"c":[33,5,15,0]},"flag-aw":{"n":[],"c":[33,6,15,0]},"flag-ax":{"n":[],"c":[33,7,15,0]},"flag-az":{"n":[],"c":[33,8,15,0]},"flag-ba":{"n":[],"c":[33,9,15,0]},"flag-bb":{"n":[],"c":[33,10,15,0]},"flag-bd":{"n":[],"c":[33,11,15,0]},"flag-be":{"n":[],"c":[33,12,15,0]},"flag-bf":{"n":[],"c":[33,13,15,0]},"flag-bg":{"n":[],"c":[33,14,15,0]},"flag-bh":{"n":[],"c":[33,15,15,0]},"flag-bi":{"n":[],"c":[33,16,15,0]},"flag-bj":{"n":[],"c":[33,17,15,0]},"flag-bl":{"n":[],"c":[33,18,13,0]},"flag-bm":{"n":[],"c":[33,19,15,0]},"flag-bn":{"n":[],"c":[33,20,15,0]},"flag-bo":{"n":[],"c":[33,21,15,0]},"flag-bq":{"n":[],"c":[33,22,13,0]},"flag-br":{"n":[],"c":[33,23,15,0]},"flag-bs":{"n":[],"c":[33,24,15,0]},"flag-bt":{"n":[],"c":[33,25,15,0]},"flag-bv":{"n":[],"c":[33,26,13,0]},"flag-bw":{"n":[],"c":[33,27,15,0]},"flag-by":{"n":[],"c":[33,28,15,0]},"flag-bz":{"n":[],"c":[33,29,15,0]},"flag-ca":{"n":[],"c":[33,30,15,0]},"flag-cc":{"n":[],"c":[33,31,15,0]},"flag-cd":{"n":[],"c":[33,32,15,0]},"flag-cf":{"n":[],"c":[33,33,15,0]},"flag-cg":{"n":[],"c":[33,34,15,0]},"flag-ch":{"n":[],"c":[33,35,15,0]},"flag-ci":{"n":[],"c":[33,36,15,0]},"flag-ck":{"n":[],"c":[33,37,15,0]},"flag-cl":{"n":[],"c":[33,38,15,0]},"flag-cm":{"n":[],"c":[33,39,15,0]},"flag-cn":{"n":["cn"],"c":[33,40,15,0]},"flag-co":{"n":[],"c":[34,0,15,0]},"flag-cp":{"n":[],"c":[34,1,13,0]},"flag-cr":{"n":[],"c":[34,2,15,0]},"flag-cu":{"n":[],"c":[34,3,15,0]},"flag-cv":{"n":[],"c":[34,4,15,0]},"flag-cw":{"n":[],"c":[34,5,15,0]},"flag-cx":{"n":[],"c":[34,6,15,0]},"flag-cy":{"n":[],"c":[34,7,15,0]},"flag-cz":{"n":[],"c":[34,8,15,0]},"flag-de":{"n":["de"],"c":[34,9,15,0]},"flag-dg":{"n":[],"c":[34,10,13,0]},"flag-dj":{"n":[],"c":[34,11,15,0]},"flag-dk":{"n":[],"c":[34,12,15,0]},"flag-dm":{"n":[],"c":[34,13,15,0]},"flag-do":{"n":[],"c":[34,14,15,0]},"flag-dz":{"n":[],"c":[34,15,15,0]},"flag-ea":{"n":[],"c":[34,16,13,0]},"flag-ec":{"n":[],"c":[34,17,15,0]},"flag-ee":{"n":[],"c":[34,18,15,0]},"flag-eg":{"n":[],"c":[34,19,15,0]},"flag-eh":{"n":[],"c":[34,20,13,0]},"flag-er":{"n":[],"c":[34,21,15,0]},"flag-es":{"n":["es"],"c":[34,22,15,0]},"flag-et":{"n":[],"c":[34,23,15,0]},"flag-eu":{"n":[],"c":[34,24,15,0]},"flag-fi":{"n":[],"c":[34,25,15,0]},"flag-fj":{"n":[],"c":[34,26,15,0]},"flag-fk":{"n":[],"c":[34,27,13,0]},"flag-fm":{"n":[],"c":[34,28,15,0]},"flag-fo":{"n":[],"c":[34,29,15,0]},"flag-fr":{"n":["fr"],"c":[34,30,15,0]},"flag-ga":{"n":[],"c":[34,31,15,0]},"flag-gb":{"n":["gb","uk"],"c":[34,32,15,0]},"flag-gd":{"n":[],"c":[34,33,15,0]},"flag-ge":{"n":[],"c":[34,34,15,0]},"flag-gf":{"n":[],"c":[34,35,13,0]},"flag-gg":{"n":[],"c":[34,36,15,0]},"flag-gh":{"n":[],"c":[34,37,15,0]},"flag-gi":{"n":[],"c":[34,38,15,0]},"flag-gl":{"n":[],"c":[34,39,15,0]},"flag-gm":{"n":[],"c":[34,40,15,0]},"flag-gn":{"n":[],"c":[35,0,15,0]},"flag-gp":{"n":[],"c":[35,1,13,0]},"flag-gq":{"n":[],"c":[35,2,15,0]},"flag-gr":{"n":[],"c":[35,3,15,0]},"flag-gs":{"n":[],"c":[35,4,13,0]},"flag-gt":{"n":[],"c":[35,5,15,0]},"flag-gu":{"n":[],"c":[35,6,15,0]},"flag-gw":{"n":[],"c":[35,7,15,0]},"flag-gy":{"n":[],"c":[35,8,15,0]},"flag-hk":{"n":[],"c":[35,9,15,0]},"flag-hm":{"n":[],"c":[35,10,13,0]},"flag-hn":{"n":[],"c":[35,11,15,0]},"flag-hr":{"n":[],"c":[35,12,15,0]},"flag-ht":{"n":[],"c":[35,13,15,0]},"flag-hu":{"n":[],"c":[35,14,15,0]},"flag-ic":{"n":[],"c":[35,15,15,0]},"flag-id":{"n":[],"c":[35,16,15,0]},"flag-ie":{"n":[],"c":[35,17,15,0]},"flag-il":{"n":[],"c":[35,18,15,0]},"flag-im":{"n":[],"c":[35,19,15,0]},"flag-in":{"n":[],"c":[35,20,15,0]},"flag-io":{"n":[],"c":[35,21,15,0]},"flag-iq":{"n":[],"c":[35,22,15,0]},"flag-ir":{"n":[],"c":[35,23,15,0]},"flag-is":{"n":[],"c":[35,24,15,0]},"flag-it":{"n":["it"],"c":[35,25,15,0]},"flag-je":{"n":[],"c":[35,26,15,0]},"flag-jm":{"n":[],"c":[35,27,15,0]},"flag-jo":{"n":[],"c":[35,28,15,0]},"flag-jp":{"n":["jp"],"c":[35,29,15,0]},"flag-ke":{"n":[],"c":[35,30,15,0]},"flag-kg":{"n":[],"c":[35,31,15,0]},"flag-kh":{"n":[],"c":[35,32,15,0]},"flag-ki":{"n":[],"c":[35,33,15,0]},"flag-km":{"n":[],"c":[35,34,15,0]},"flag-kn":{"n":[],"c":[35,35,15,0]},"flag-kp":{"n":[],"c":[35,36,15,0]},"flag-kr":{"n":["kr"],"c":[35,37,15,0]},"flag-kw":{"n":[],"c":[35,38,15,0]},"flag-ky":{"n":[],"c":[35,39,15,0]},"flag-kz":{"n":[],"c":[35,40,15,0]},"flag-la":{"n":[],"c":[36,0,15,0]},"flag-lb":{"n":[],"c":[36,1,15,0]},"flag-lc":{"n":[],"c":[36,2,15,0]},"flag-li":{"n":[],"c":[36,3,15,0]},"flag-lk":{"n":[],"c":[36,4,15,0]},"flag-lr":{"n":[],"c":[36,5,15,0]},"flag-ls":{"n":[],"c":[36,6,15,0]},"flag-lt":{"n":[],"c":[36,7,15,0]},"flag-lu":{"n":[],"c":[36,8,15,0]},"flag-lv":{"n":[],"c":[36,9,15,0]},"flag-ly":{"n":[],"c":[36,10,15,0]},"flag-ma":{"n":[],"c":[36,11,15,0]},"flag-mc":{"n":[],"c":[36,12,15,0]},"flag-md":{"n":[],"c":[36,13,15,0]},"flag-me":{"n":[],"c":[36,14,15,0]},"flag-mf":{"n":[],"c":[36,15,13,0]},"flag-mg":{"n":[],"c":[36,16,15,0]},"flag-mh":{"n":[],"c":[36,17,15,0]},"flag-mk":{"n":[],"c":[36,18,15,0]},"flag-ml":{"n":[],"c":[36,19,15,0]},"flag-mm":{"n":[],"c":[36,20,15,0]},"flag-mn":{"n":[],"c":[36,21,15,0]},"flag-mo":{"n":[],"c":[36,22,15,0]},"flag-mp":{"n":[],"c":[36,23,15,0]},"flag-mq":{"n":[],"c":[36,24,13,0]},"flag-mr":{"n":[],"c":[36,25,15,0]},"flag-ms":{"n":[],"c":[36,26,15,0]},"flag-mt":{"n":[],"c":[36,27,15,0]},"flag-mu":{"n":[],"c":[36,28,15,0]},"flag-mv":{"n":[],"c":[36,29,15,0]},"flag-mw":{"n":[],"c":[36,30,15,0]},"flag-mx":{"n":[],"c":[36,31,15,0]},"flag-my":{"n":[],"c":[36,32,15,0]},"flag-mz":{"n":[],"c":[36,33,15,0]},"flag-na":{"n":[],"c":[36,34,15,0]},"flag-nc":{"n":[],"c":[36,35,13,0]},"flag-ne":{"n":[],"c":[36,36,15,0]},"flag-nf":{"n":[],"c":[36,37,15,0]},"flag-ng":{"n":[],"c":[36,38,15,0]},"flag-ni":{"n":[],"c":[36,39,15,0]},"flag-nl":{"n":[],"c":[36,40,15,0]},"flag-no":{"n":[],"c":[37,0,15,0]},"flag-np":{"n":[],"c":[37,1,15,0]},"flag-nr":{"n":[],"c":[37,2,15,0]},"flag-nu":{"n":[],"c":[37,3,15,0]},"flag-nz":{"n":[],"c":[37,4,15,0]},"flag-om":{"n":[],"c":[37,5,15,0]},"flag-pa":{"n":[],"c":[37,6,15,0]},"flag-pe":{"n":[],"c":[37,7,15,0]},"flag-pf":{"n":[],"c":[37,8,15,0]},"flag-pg":{"n":[],"c":[37,9,15,0]},"flag-ph":{"n":[],"c":[37,10,15,0]},"flag-pk":{"n":[],"c":[37,11,15,0]},"flag-pl":{"n":[],"c":[37,12,15,0]},"flag-pm":{"n":[],"c":[37,13,13,0]},"flag-pn":{"n":[],"c":[37,14,15,0]},"flag-pr":{"n":[],"c":[37,15,15,0]},"flag-ps":{"n":[],"c":[37,16,15,0]},"flag-pt":{"n":[],"c":[37,17,15,0]},"flag-pw":{"n":[],"c":[37,18,15,0]},"flag-py":{"n":[],"c":[37,19,15,0]},"flag-qa":{"n":[],"c":[37,20,15,0]},"flag-re":{"n":[],"c":[37,21,13,0]},"flag-ro":{"n":[],"c":[37,22,15,0]},"flag-rs":{"n":[],"c":[37,23,15,0]},"flag-ru":{"n":["ru"],"c":[37,24,15,0]},"flag-rw":{"n":[],"c":[37,25,15,0]},"flag-sa":{"n":[],"c":[37,26,15,0]},"flag-sb":{"n":[],"c":[37,27,15,0]},"flag-sc":{"n":[],"c":[37,28,15,0]},"flag-sd":{"n":[],"c":[37,29,15,0]},"flag-se":{"n":[],"c":[37,30,15,0]},"flag-sg":{"n":[],"c":[37,31,15,0]},"flag-sh":{"n":[],"c":[37,32,15,0]},"flag-si":{"n":[],"c":[37,33,15,0]},"flag-sj":{"n":[],"c":[37,34,13,0]},"flag-sk":{"n":[],"c":[37,35,15,0]},"flag-sl":{"n":[],"c":[37,36,15,0]},"flag-sm":{"n":[],"c":[37,37,15,0]},"flag-sn":{"n":[],"c":[37,38,15,0]},"flag-so":{"n":[],"c":[37,39,15,0]},"flag-sr":{"n":[],"c":[37,40,15,0]},"flag-ss":{"n":[],"c":[38,0,15,0]},"flag-st":{"n":[],"c":[38,1,15,0]},"flag-sv":{"n":[],"c":[38,2,15,0]},"flag-sx":{"n":[],"c":[38,3,15,0]},"flag-sy":{"n":[],"c":[38,4,15,0]},"flag-sz":{"n":[],"c":[38,5,15,0]},"flag-ta":{"n":[],"c":[38,6,15,0]},"flag-tc":{"n":[],"c":[38,7,15,0]},"flag-td":{"n":[],"c":[38,8,15,0]},"flag-tf":{"n":[],"c":[38,9,13,0]},"flag-tg":{"n":[],"c":[38,10,15,0]},"flag-th":{"n":[],"c":[38,11,15,0]},"flag-tj":{"n":[],"c":[38,12,15,0]},"flag-tk":{"n":[],"c":[38,13,15,0]},"flag-tl":{"n":[],"c":[38,14,15,0]},"flag-tm":{"n":[],"c":[38,15,15,0]},"flag-tn":{"n":[],"c":[38,16,15,0]},"flag-to":{"n":[],"c":[38,17,15,0]},"flag-tr":{"n":[],"c":[38,18,15,0]},"flag-tt":{"n":[],"c":[38,19,15,0]},"flag-tv":{"n":[],"c":[38,20,15,0]},"flag-tw":{"n":[],"c":[38,21,15,0]},"flag-tz":{"n":[],"c":[38,22,15,0]},"flag-ua":{"n":[],"c":[38,23,15,0]},"flag-ug":{"n":[],"c":[38,24,15,0]},"flag-um":{"n":[],"c":[38,25,13,0]},"flag-us":{"n":["us"],"c":[38,26,15,0]},"flag-uy":{"n":[],"c":[38,27,15,0]},"flag-uz":{"n":[],"c":[38,28,15,0]},"flag-va":{"n":[],"c":[38,29,15,0]},"flag-vc":{"n":[],"c":[38,30,15,0]},"flag-ve":{"n":[],"c":[38,31,15,0]},"flag-vg":{"n":[],"c":[38,32,15,0]},"flag-vi":{"n":[],"c":[38,33,15,0]},"flag-vn":{"n":[],"c":[38,34,15,0]},"flag-vu":{"n":[],"c":[38,35,15,0]},"flag-wf":{"n":[],"c":[38,36,13,0]},"flag-ws":{"n":[],"c":[38,37,15,0]},"flag-xk":{"n":[],"c":[38,38,13,0]},"flag-ye":{"n":[],"c":[38,39,15,0]},"flag-yt":{"n":[],"c":[38,40,13,0]},"flag-za":{"n":[],"c":[39,0,15,0]},"flag-zm":{"n":[],"c":[39,1,15,0]},"flag-zw":{"n":[],"c":[39,2,15,0]},"man-man-boy":{"n":[],"c":[39,3,15,0]},"man-man-boy-boy":{"n":[],"c":[39,4,15,0]},"man-man-girl":{"n":[],"c":[39,5,15,0]},"man-man-girl-boy":{"n":[],"c":[39,6,15,0]},"man-man-girl-girl":{"n":[],"c":[39,7,15,0]},"man-woman-boy-boy":{"n":[],"c":[39,8,15,0]},"man-woman-girl":{"n":[],"c":[39,9,15,0]},"man-woman-girl-boy":{"n":[],"c":[39,10,15,0]},"man-woman-girl-girl":{"n":[],"c":[39,11,15,0]},"man-heart-man":{"n":[],"c":[39,12,7,0]},"man-kiss-man":{"n":[],"c":[39,13,7,0]},"woman-woman-boy":{"n":[],"c":[39,14,15,0]},"woman-woman-boy-boy":{"n":[],"c":[39,15,15,0]},"woman-woman-girl":{"n":[],"c":[39,16,15,0]},"woman-woman-girl-boy":{"n":[],"c":[39,17,15,0]},"woman-woman-girl-girl":{"n":[],"c":[39,18,15,0]},"woman-heart-woman":{"n":[],"c":[39,19,7,0]},"woman-kiss-woman":{"n":[],"c":[39,20,7,0]}}

  var emojiData = {
    "Symbols": ["heart", "yellow_heart", "green_heart", "blue_heart", "purple_heart", "broken_heart", "heavy_heart_exclamation_mark_ornament", "two_hearts", "revolving_hearts", "heartbeat", "heartpulse", "sparkling_heart", "cupid", "gift_heart", "heart_decoration", "peace_symbol", "latin_cross", "star_and_crescent", "om_symbol", "wheel_of_dharma", "star_of_david", "six_pointed_star", "menorah_with_nine_branches", "yin_yang", "orthodox_cross", "place_of_worship", "ophiuchus", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpius", "sagittarius", "capricorn", "aquarius", "pisces", "id", "atom_symbol", "u7a7a", "u5272", "radioactive_sign", "biohazard_sign", "mobile_phone_off", "vibration_mode", "u6709", "u7121", "u7533", "u55b6", "u6708", "eight_pointed_black_star", "vs", "accept", "white_flower", "ideograph_advantage", "secret", "congratulations", "u5408", "u6e80", "u7981", "a", "b", "ab", "cl", "o2", "sos", "no_entry", "name_badge", "no_entry_sign", "x", "o", "anger", "hotsprings", "no_pedestrians", "do_not_litter", "no_bicycles", "non-potable_water", "underage", "no_mobile_phones", "exclamation", "grey_exclamation", "question", "grey_question", "bangbang", "interrobang", "100", "low_brightness", "high_brightness", "trident", "fleur_de_lis", "part_alternation_mark", "warning", "children_crossing", "beginner", "recycle", "u6307", "chart", "sparkle", "eight_spoked_asterisk", "negative_squared_cross_mark", "white_check_mark", "diamond_shape_with_a_dot_inside", "cyclone", "loop", "globe_with_meridians", "m", "atm", "sa", "passport_control", "customs", "baggage_claim", "left_luggage", "wheelchair", "no_smoking", "wc", "parking", "potable_water", "mens", "womens", "baby_symbol", "restroom", "put_litter_in_its_place", "cinema", "signal_strength", "koko", "ng", "ok", "up", "cool", "new", "free", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "keycap_ten", "keycap_star", "1234", "arrow_forward", "double_vertical_bar", "black_right_pointing_triangle_with_double_vertical_bar", "black_square_for_stop", "eject", "black_circle_for_record", "black_right_pointing_double_triangle_with_vertical_bar", "black_left_pointing_double_triangle_with_vertical_bar", "fast_forward", "rewind", "twisted_rightwards_arrows", "repeat", "repeat_one", "arrow_backward", "arrow_up_small", "arrow_down_small", "arrow_double_up", "arrow_double_down", "arrow_right", "arrow_left", "arrow_up", "arrow_down", "arrow_upper_right", "arrow_lower_right", "arrow_lower_left", "arrow_upper_left", "arrow_up_down", "left_right_arrow", "arrows_counterclockwise", "arrow_right_hook", "leftwards_arrow_with_hook", "arrow_heading_up", "arrow_heading_down", "hash", "information_source", "abc", "abcd", "capital_abcd", "symbols", "musical_note", "notes", "wavy_dash", "curly_loop", "heavy_check_mark", "arrows_clockwise", "heavy_plus_sign", "heavy_minus_sign", "heavy_division_sign", "heavy_multiplication_x", "heavy_dollar_sign", "currency_exchange", "copyright", "registered", "tm", "end", "back", "on", "top", "soon", "ballot_box_with_check", "radio_button", "white_circle", "black_circle", "red_circle", "large_blue_circle", "small_orange_diamond", "small_blue_diamond", "large_orange_diamond", "large_blue_diamond", "small_red_triangle", "black_small_square", "white_small_square", "black_large_square", "white_large_square", "small_red_triangle_down", "black_medium_square", "white_medium_square", "black_medium_small_square", "white_medium_small_square", "black_square_button", "white_square_button", "speaker", "sound", "loud_sound", "mute", "mega", "loudspeaker", "bell", "no_bell", "black_joker", "mahjong", "spades", "clubs", "hearts", "diamonds", "flower_playing_cards", "thought_balloon", "right_anger_bubble", "speech_balloon", "left_speech_bubble", "clock1", "clock2", "clock3", "clock4", "clock5", "clock6", "clock7", "clock8", "clock9", "clock10", "clock11", "clock12", "clock130", "clock230", "clock330", "clock430", "clock530", "clock630", "clock730", "clock830", "clock930", "clock1030", "clock1130", "clock1230"],
    "Objects": ["watch", "iphone", "calling", "computer", "keyboard", "desktop_computer", "printer", "three_button_mouse", "trackball", "joystick", "compression", "minidisc", "floppy_disk", "cd", "dvd", "vhs", "camera", "camera_with_flash", "video_camera", "movie_camera", "film_projector", "film_frames", "telephone_receiver", "phone", "pager", "fax", "tv", "radio", "studio_microphone", "level_slider", "control_knobs", "stopwatch", "timer_clock", "alarm_clock", "mantelpiece_clock", "hourglass_flowing_sand", "hourglass", "satellite_antenna", "battery", "electric_plug", "bulb", "flashlight", "candle", "wastebasket", "oil_drum", "money_with_wings", "dollar", "yen", "euro", "pound", "moneybag", "credit_card", "gem", "scales", "wrench", "hammer", "hammer_and_pick", "hammer_and_wrench", "pick", "nut_and_bolt", "gear", "chains", "gun", "bomb", "hocho", "dagger_knife", "crossed_swords", "shield", "smoking", "skull_and_crossbones", "coffin", "funeral_urn", "amphora", "crystal_ball", "prayer_beads", "barber", "alembic", "telescope", "microscope", "hole", "pill", "syringe", "thermometer", "label", "bookmark", "toilet", "shower", "bathtub", "key", "old_key", "couch_and_lamp", "sleeping_accommodation", "bed", "door", "bellhop_bell", "frame_with_picture", "world_map", "umbrella_on_ground", "moyai", "shopping_bags", "balloon", "flags", "ribbon", "gift", "confetti_ball", "tada", "dolls", "wind_chime", "crossed_flags", "izakaya_lantern", "email", "envelope_with_arrow", "incoming_envelope", "e-mail", "love_letter", "postbox", "mailbox_closed", "mailbox", "mailbox_with_mail", "mailbox_with_no_mail", "package", "postal_horn", "inbox_tray", "outbox_tray", "scroll", "page_with_curl", "bookmark_tabs", "bar_chart", "chart_with_upwards_trend", "chart_with_downwards_trend", "page_facing_up", "date", "calendar", "spiral_calendar_pad", "card_index", "card_file_box", "ballot_box_with_ballot", "file_cabinet", "clipboard", "spiral_note_pad", "file_folder", "open_file_folder", "card_index_dividers", "rolled_up_newspaper", "newspaper", "notebook", "closed_book", "green_book", "blue_book", "orange_book", "notebook_with_decorative_cover", "ledger", "books", "book", "link", "paperclip", "linked_paperclips", "scissors", "triangular_ruler", "straight_ruler", "pushpin", "round_pushpin", "triangular_flag_on_post", "waving_white_flag", "waving_black_flag", "closed_lock_with_key", "lock", "unlock", "lock_with_ink_pen", "lower_left_ballpoint_pen", "lower_left_fountain_pen", "black_nib", "memo", "pencil2", "lower_left_crayon", "lower_left_paintbrush", "mag", "mag_right"],
    "Nature": ["dog", "cat", "mouse", "hamster", "rabbit", "bear", "panda_face", "koala", "tiger", "lion_face", "cow", "pig", "pig_nose", "frog", "octopus", "monkey_face", "see_no_evil", "hear_no_evil", "speak_no_evil", "monkey", "chicken", "penguin", "bird", "baby_chick", "hatching_chick", "hatched_chick", "wolf", "boar", "horse", "unicorn_face", "bee", "bug", "snail", "beetle", "ant", "spider", "scorpion", "crab", "snake", "turtle", "tropical_fish", "fish", "blowfish", "dolphin", "whale", "whale2", "crocodile", "leopard", "tiger2", "water_buffalo", "ox", "cow2", "dromedary_camel", "camel", "elephant", "goat", "ram", "sheep", "racehorse", "pig2", "rat", "mouse2", "rooster", "turkey", "dove_of_peace", "dog2", "poodle", "cat2", "rabbit2", "chipmunk", "feet", "dragon", "dragon_face", "cactus", "christmas_tree", "evergreen_tree", "deciduous_tree", "palm_tree", "seedling", "herb", "shamrock", "four_leaf_clover", "bamboo", "tanabata_tree", "leaves", "fallen_leaf", "maple_leaf", "ear_of_rice", "hibiscus", "sunflower", "rose", "tulip", "blossom", "cherry_blossom", "bouquet", "mushroom", "chestnut", "jack_o_lantern", "shell", "spider_web", "earth_americas", "earth_africa", "earth_asia", "full_moon", "waning_gibbous_moon", "last_quarter_moon", "waning_crescent_moon", "new_moon", "waxing_crescent_moon", "first_quarter_moon", "moon", "new_moon_with_face", "full_moon_with_face", "first_quarter_moon_with_face", "last_quarter_moon_with_face", "sun_with_face", "crescent_moon", "star", "star2", "dizzy", "sparkles", "comet", "sunny", "mostly_sunny", "partly_sunny", "barely_sunny", "partly_sunny_rain", "cloud", "rain_cloud", "thunder_cloud_and_rain", "lightning", "zap", "fire", "boom", "snowflake", "snow_cloud", "snowman", "snowman_without_snow", "wind_blowing_face", "dash", "tornado", "fog", "umbrella", "umbrella_with_rain_drops", "droplet", "sweat_drops", "ocean"],
    "Foods": ["green_apple", "apple", "pear", "tangerine", "lemon", "banana", "watermelon", "grapes", "strawberry", "melon", "cherries", "peach", "pineapple", "tomato", "eggplant", "hot_pepper", "corn", "sweet_potato", "honey_pot", "bread", "cheese_wedge", "poultry_leg", "meat_on_bone", "fried_shrimp", "egg", "hamburger", "fries", "hotdog", "pizza", "spaghetti", "taco", "burrito", "ramen", "stew", "fish_cake", "sushi", "bento", "curry", "rice_ball", "rice", "rice_cracker", "oden", "dango", "shaved_ice", "ice_cream", "icecream", "cake", "birthday", "custard", "candy", "lollipop", "chocolate_bar", "popcorn", "doughnut", "cookie", "beer", "beers", "wine_glass", "cocktail", "tropical_drink", "champagne", "sake", "tea", "coffee", "baby_bottle", "fork_and_knife", "knife_fork_plate"],
    "People": ["grinning", "grimacing", "grin", "joy", "smiley", "smile", "sweat_smile", "laughing", "innocent", "wink", "blush", "slightly_smiling_face", "upside_down_face", "relaxed", "yum", "relieved", "heart_eyes", "kissing_heart", "kissing", "kissing_smiling_eyes", "kissing_closed_eyes", "stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "stuck_out_tongue", "money_mouth_face", "nerd_face", "sunglasses", "hugging_face", "smirk", "no_mouth", "neutral_face", "expressionless", "unamused", "face_with_rolling_eyes", "thinking_face", "flushed", "disappointed", "worried", "angry", "rage", "pensive", "confused", "slightly_frowning_face", "white_frowning_face", "persevere", "confounded", "tired_face", "weary", "triumph", "open_mouth", "scream", "fearful", "cold_sweat", "hushed", "frowning", "anguished", "cry", "disappointed_relieved", "sleepy", "sweat", "sob", "dizzy_face", "astonished", "zipper_mouth_face", "mask", "face_with_thermometer", "face_with_head_bandage", "sleeping", "zzz", "hankey", "smiling_imp", "imp", "japanese_ogre", "japanese_goblin", "skull", "ghost", "alien", "robot_face", "smiley_cat", "smile_cat", "joy_cat", "heart_eyes_cat", "smirk_cat", "kissing_cat", "scream_cat", "crying_cat_face", "pouting_cat", "raised_hands", "clap", "wave", "+1", "-1", "facepunch", "fist", "v", "ok_hand", "hand", "open_hands", "muscle", "pray", "point_up", "point_up_2", "point_down", "point_left", "point_right", "middle_finger", "raised_hand_with_fingers_splayed", "the_horns", "spock-hand", "writing_hand", "nail_care", "lips", "tongue", "ear", "nose", "eye", "eyes", "bust_in_silhouette", "busts_in_silhouette", "speaking_head_in_silhouette", "baby", "boy", "girl", "man", "woman", "person_with_blond_hair", "older_man", "older_woman", "man_with_gua_pi_mao", "man_with_turban", "cop", "construction_worker", "guardsman", "sleuth_or_spy", "santa", "angel", "princess", "bride_with_veil", "walking", "runner", "dancer", "dancers", "couple", "two_men_holding_hands", "two_women_holding_hands", "bow", "information_desk_person", "no_good", "ok_woman", "raising_hand", "person_with_pouting_face", "person_frowning", "haircut", "massage", "couple_with_heart", "woman-heart-woman", "man-heart-man", "couplekiss", "woman-kiss-woman", "man-kiss-man", "family", "man-woman-girl", "man-woman-girl-boy", "man-woman-boy-boy", "man-woman-girl-girl", "woman-woman-boy", "woman-woman-girl", "woman-woman-girl-boy", "woman-woman-boy-boy", "woman-woman-girl-girl", "man-man-boy", "man-man-girl", "man-man-girl-boy", "man-man-boy-boy", "man-man-girl-girl", "womans_clothes", "shirt", "jeans", "necktie", "dress", "bikini", "kimono", "lipstick", "kiss", "footprints", "high_heel", "sandal", "boot", "mans_shoe", "athletic_shoe", "womans_hat", "tophat", "helmet_with_white_cross", "mortar_board", "crown", "school_satchel", "pouch", "purse", "handbag", "briefcase", "eyeglasses", "dark_sunglasses", "ring", "closed_umbrella"],
    "Places": ["car", "taxi", "blue_car", "bus", "trolleybus", "racing_car", "police_car", "ambulance", "fire_engine", "minibus", "truck", "articulated_lorry", "tractor", "racing_motorcycle", "bike", "rotating_light", "oncoming_police_car", "oncoming_bus", "oncoming_automobile", "oncoming_taxi", "aerial_tramway", "mountain_cableway", "suspension_railway", "railway_car", "train", "monorail", "bullettrain_side", "bullettrain_front", "light_rail", "mountain_railway", "steam_locomotive", "train2", "metro", "tram", "station", "helicopter", "small_airplane", "airplane", "airplane_departure", "airplane_arriving", "boat", "motor_boat", "speedboat", "ferry", "passenger_ship", "rocket", "satellite", "seat", "anchor", "construction", "fuelpump", "busstop", "vertical_traffic_light", "traffic_light", "checkered_flag", "ship", "ferris_wheel", "roller_coaster", "carousel_horse", "building_construction", "foggy", "tokyo_tower", "factory", "fountain", "rice_scene", "mountain", "snow_capped_mountain", "mount_fuji", "volcano", "japan", "camping", "tent", "national_park", "motorway", "railway_track", "sunrise", "sunrise_over_mountains", "desert", "beach_with_umbrella", "desert_island", "city_sunrise", "city_sunset", "cityscape", "night_with_stars", "bridge_at_night", "milky_way", "stars", "sparkler", "fireworks", "rainbow", "house_buildings", "european_castle", "japanese_castle", "stadium", "statue_of_liberty", "house", "house_with_garden", "derelict_house_building", "office", "department_store", "post_office", "european_post_office", "hospital", "bank", "hotel", "convenience_store", "school", "love_hotel", "wedding", "classical_building", "church", "mosque", "synagogue", "kaaba", "shinto_shrine"],
    "Activity": ["soccer", "basketball", "football", "baseball", "tennis", "volleyball", "rugby_football", "8ball", "golf", "golfer", "table_tennis_paddle_and_ball", "badminton_racquet_and_shuttlecock", "ice_hockey_stick_and_puck", "field_hockey_stick_and_ball", "cricket_bat_and_ball", "ski", "skier", "snowboarder", "ice_skate", "bow_and_arrow", "fishing_pole_and_fish", "rowboat", "swimmer", "surfer", "bath", "person_with_ball", "weight_lifter", "bicyclist", "mountain_bicyclist", "horse_racing", "man_in_business_suit_levitating", "trophy", "running_shirt_with_sash", "sports_medal", "medal", "reminder_ribbon", "rosette", "ticket", "admission_tickets", "performing_arts", "art", "circus_tent", "microphone", "headphones", "musical_score", "musical_keyboard", "saxophone", "trumpet", "guitar", "violin", "clapper", "video_game", "space_invader", "dart", "game_die", "slot_machine", "bowling"],
    "Flags": ["flag-af", "flag-ax", "flag-al", "flag-dz", "flag-as", "flag-ad", "flag-ao", "flag-ai", "flag-aq", "flag-ag", "flag-ar", "flag-am", "flag-aw", "flag-au", "flag-at", "flag-az", "flag-bs", "flag-bh", "flag-bd", "flag-bb", "flag-by", "flag-be", "flag-bz", "flag-bj", "flag-bm", "flag-bt", "flag-bo", "flag-bq", "flag-ba", "flag-bw", "flag-br", "flag-io", "flag-vg", "flag-bn", "flag-bg", "flag-bf", "flag-bi", "flag-cv", "flag-kh", "flag-cm", "flag-ca", "flag-ic", "flag-ky", "flag-cf", "flag-td", "flag-cl", "flag-cn", "flag-cx", "flag-cc", "flag-co", "flag-km", "flag-cg", "flag-cd", "flag-ck", "flag-cr", "flag-hr", "flag-cu", "flag-cw", "flag-cy", "flag-cz", "flag-dk", "flag-dj", "flag-dm", "flag-do", "flag-ec", "flag-eg", "flag-sv", "flag-gq", "flag-er", "flag-ee", "flag-et", "flag-eu", "flag-fk", "flag-fo", "flag-fj", "flag-fi", "flag-fr", "flag-gf", "flag-pf", "flag-tf", "flag-ga", "flag-gm", "flag-ge", "flag-de", "flag-gh", "flag-gi", "flag-gr", "flag-gl", "flag-gd", "flag-gp", "flag-gu", "flag-gt", "flag-gg", "flag-gn", "flag-gw", "flag-gy", "flag-ht", "flag-hn", "flag-hk", "flag-hu", "flag-is", "flag-in", "flag-id", "flag-ir", "flag-iq", "flag-ie", "flag-im", "flag-il", "flag-it", "flag-ci", "flag-jm", "flag-jp", "flag-je", "flag-jo", "flag-kz", "flag-ke", "flag-ki", "flag-xk", "flag-kw", "flag-kg", "flag-la", "flag-lv", "flag-lb", "flag-ls", "flag-lr", "flag-ly", "flag-li", "flag-lt", "flag-lu", "flag-mo", "flag-mk", "flag-mg", "flag-mw", "flag-my", "flag-mv", "flag-ml", "flag-mt", "flag-mh", "flag-mq", "flag-mr", "flag-mu", "flag-yt", "flag-mx", "flag-fm", "flag-md", "flag-mc", "flag-mn", "flag-me", "flag-ms", "flag-ma", "flag-mz", "flag-mm", "flag-na", "flag-nr", "flag-np", "flag-nl", "flag-nc", "flag-nz", "flag-ni", "flag-ne", "flag-ng", "flag-nu", "flag-nf", "flag-mp", "flag-kp", "flag-no", "flag-om", "flag-pk", "flag-pw", "flag-ps", "flag-pa", "flag-pg", "flag-py", "flag-pe", "flag-ph", "flag-pn", "flag-pl", "flag-pt", "flag-pr", "flag-qa", "flag-re", "flag-ro", "flag-ru", "flag-rw", "flag-bl", "flag-sh", "flag-kn", "flag-lc", "flag-pm", "flag-vc", "flag-ws", "flag-sm", "flag-st", "flag-sa", "flag-sn", "flag-rs", "flag-sc", "flag-sl", "flag-sg", "flag-sx", "flag-sk", "flag-si", "flag-sb", "flag-so", "flag-za", "flag-gs", "flag-kr", "flag-ss", "flag-es", "flag-lk", "flag-sd", "flag-sr", "flag-sz", "flag-se", "flag-ch", "flag-sy", "flag-tw", "flag-tj", "flag-tz", "flag-th", "flag-tl", "flag-tg", "flag-tk", "flag-to", "flag-tt", "flag-tn", "flag-tr", "flag-tm", "flag-tc", "flag-tv", "flag-ug", "flag-ua", "flag-ae", "flag-gb", "flag-us", "flag-vi", "flag-uy", "flag-uz", "flag-vu", "flag-va", "flag-ve", "flag-vn", "flag-wf", "flag-eh", "flag-ye", "flag-zm", "flag-zw", "flag-ac", "flag-bv", "flag-cp", "flag-dg", "flag-ea", "flag-hm", "flag-mf", "flag-sj", "flag-ta", "flag-um"]
  }

  window.EmojiPicker = Picker;
}(window));
