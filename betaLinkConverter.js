(function betaLinkConverter_0_1() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str, err);
    setTimeout(WF.hideMessage, (sec || 2) * 1000);
  }
  function applyToEachItem(functionToApply, parent) {
    functionToApply(parent);
    for (let child of parent.getChildren()) {
      applyToEachItem(functionToApply, child);
    }
  }
  function findMatchingItems(itemPredicate, parent) {
    const matches = [];
    function addIfMatch(item) {
      if (itemPredicate(item)) {
        matches.push(item);
      }
    }
    applyToEachItem(addIfMatch, parent);
    return matches;
  }
  function convertItemBetaLinks(item, isNote) {
    const content = isNote ? item.getNote() : item.getName();
    const nuContent = content.replace(/https:\/\/beta\.workflowy\.com/g, "https://workflowy.com");
    isNote ? WF.setItemNote(item, nuContent) : WF.setItemName(item, nuContent);
  }
  const contentHasBetaLink = str => /https:\/\/beta\.workflowy\.com/.test(str);
  const isNotMirror = item => item.data.metadata.originalId === undefined;
  const current = WF.currentItem();
  const nameLinks = findMatchingItems(item => !item.isReadOnly() && isNotMirror(item) && contentHasBetaLink(item.getName()), current);
  const noteLinks = findMatchingItems(item => !item.isReadOnly() && isNotMirror(item) && contentHasBetaLink(item.getNote()), current);
  if (nameLinks.length === 0 && noteLinks.length === 0) return void toastMsg("No editable BETA links found!", 5, true);
  if (confirm(`\nCONVERT BETA LINKS?\n\n${nameLinks.length} found in bullet NAMES\n${noteLinks.length} found in bullet NOTES`)) {
    WF.editGroup(() => {
      nameLinks.forEach(item => convertItemBetaLinks(item, false));
      noteLinks.forEach(item => convertItemBetaLinks(item, true));
      toastMsg(`<b>${nameLinks.length + noteLinks.length} items with beta links converted!</b>`, 5)
    });
  }
})();