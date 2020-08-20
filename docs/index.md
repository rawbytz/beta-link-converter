# Beta Link Converter for WorkFlowy
- Converts internal beta WorkFlowy links to the production website URL.
- Acts on the current zoom level. 
- To convert ALL links, activate from your home page.
- Always asks to confirm first.

![confirm](https://i.imgur.com/M5o2XAp.png)

## Installation: Drag this link to your bookmarks bar:

<a href="javascript:(function betaLinkConverter_0_1(){function toastMsg(str,sec,err){WF.showMessage(str,err);setTimeout(WF.hideMessage,(sec||2)*1e3)}function applyToEachItem(functionToApply,parent){functionToApply(parent);for(let child of parent.getChildren()){applyToEachItem(functionToApply,child)}}function findMatchingItems(itemPredicate,parent){const matches=[];function addIfMatch(item){if(itemPredicate(item)){matches.push(item)}}applyToEachItem(addIfMatch,parent);return matches}function convertItemBetaLinks(item,isNote){const content=isNote?item.getNote():item.getName();const nuContent=content.replace(/https:\/\/beta\.workflowy\.com/g,&quot;https://workflowy.com&quot;);isNote?WF.setItemNote(item,nuContent):WF.setItemName(item,nuContent)}const contentHasBetaLink=str=&gt;/https:\/\/beta\.workflowy\.com/.test(str);const isNotMirror=item=&gt;item.data.metadata.originalId===undefined;const current=WF.currentItem();const nameLinks=findMatchingItems(item=&gt;!item.isReadOnly()&amp;&amp;isNotMirror(item)&amp;&amp;contentHasBetaLink(item.getName()),current);const noteLinks=findMatchingItems(item=&gt;!item.isReadOnly()&amp;&amp;isNotMirror(item)&amp;&amp;contentHasBetaLink(item.getNote()),current);if(nameLinks.length===0&amp;&amp;noteLinks.length===0)return void toastMsg(&quot;No editable BETA links found!&quot;,5,true);if(confirm(`\nCONVERT BETA LINKS?\n\n${nameLinks.length} found in bullet NAMES\n${noteLinks.length} found in bullet NOTES`)){WF.editGroup(()=&gt;{nameLinks.forEach(item=&gt;convertItemBetaLinks(item,false));noteLinks.forEach(item=&gt;convertItemBetaLinks(item,true));toastMsg(`&lt;b&gt;${nameLinks.length+noteLinks.length} items with beta links converted!&lt;/b&gt;`,5)})}})();">betaLinkConverter</a>

## Links:
- [Source code](https://github.com/rawbytz/beta-link-converter/blob/master/betaLinkConverter.js)
- [rawbytz Blog](https://rawbytz.wordpress.com)


## Version Notes:
- v0.1 (2020-07-24): First release
