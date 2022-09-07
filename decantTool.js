window.addEventListener('load', () => {
	addSortListeners();
	stylePotionForm();
});
//TODO: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript Add re-sorting on page load.
function addSortListeners(){
	var potionComparisonTable = document.querySelector("#potionComparisonTable");
	var headers = potionComparisonTable.querySelectorAll("thead tr th");
	//Represents first column as sorted
	var lastDescSortedIndex = 0;
	headers.forEach((element, index, array) => {
		element.addEventListener("click", function(e){
			sortPotionTable(e, index)
		});
	});
	function sortPotionTable(event, index){
		var tableBody = potionComparisonTable.querySelector("tbody");
		var tableRows = potionComparisonTable.querySelectorAll("tbody tr");
		//Sorting https://stackoverflow.com/questions/67853327/sorting-a-html-table-with-arraysort
		if(lastDescSortedIndex == index){
			if(index == 0){
				//Sort strings
				Array.from(tableRows).sort((a, b) => b.cells[index].textContent.localeCompare(a.cells[index].textContent, "en")).forEach(tr => tableBody.appendChild(tr));
			}else{
				//Sort numeric values
				Array.from(tableRows).sort((a, b) => a.cells[index].textContent - b.cells[index].textContent).forEach(tr => tableBody.appendChild(tr));
			}
			lastDescSortedIndex = null;
		}else{
			if(index == 0){
				//Sort strings
				Array.from(tableRows).sort((a, b) => a.cells[index].textContent.localeCompare(b.cells[index].textContent, "en")).forEach(tr => tableBody.appendChild(tr));
			}else{
				//Sort numeric values
				Array.from(tableRows).sort((a, b) => b.cells[index].textContent - a.cells[index].textContent).forEach(tr => tableBody.appendChild(tr));
			}
			lastDescSortedIndex = index;
		}		
	}
}
function stylePotionForm(){
	
	let potionFormModeSelect = document.querySelector('#modeDecantOption');
	let potionFormModeOptions = potionFormModeSelect.querySelectorAll('option');

	let params = (new URL(document.location)).searchParams;
	let potionFormMode = null;
	if(potionFormMode = params.get('modeDecantOption')){
		potionFormModeOptions.forEach(option => {		
			if(potionFormMode == option.value){
				option.setAttribute('selected','');
			}			
		});		
	}else{
		potionFormModeOptions.forEach(option => {
			if(option.value == 2){
				option.setAttribute('selected','');
			}			
		});
	}
}
