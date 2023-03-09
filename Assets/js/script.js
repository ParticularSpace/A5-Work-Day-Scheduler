// pull data from local storage and apply it to the hour it was saved to once the html has been loaded

$(document).ready(function () {

  $('.time-block').each(function () {

    let timeBlockId = $(this).attr('id');
    let savedData = localStorage.getItem(timeBlockId);

    if (savedData) {
      $(this).find('textarea').val(savedData);
    }
  });



const saveButton = $('.saveBtn')

//checks for save button click and saves to local storage
saveButton.on('click', function (event) {
  event.preventDefault();

  const timeBlock = $(this).parent();
  const timeBlockId = timeBlock.attr('id');
  const description = timeBlock.children('textarea').val();

  localStorage.setItem(timeBlockId, description);

});

var today = dayjs();

//displays current date and time
$('#1a').text(today.format('MMM D, YYYY'));
$('#2a').text(today.format('h:mm A'));



//checks current hour and id then adds class to change color of time block
$('.time-block').each(function () {
  const blockHour = parseInt($(this).attr('id'));
  const currentHour = parseInt(dayjs().format('HH'));

  if (blockHour < currentHour) {
    $(this).addClass('past');
  } else if (blockHour === currentHour) {
    $(this).addClass('present');
  } else {
    $(this).addClass('future');
  }
});

// clear local storage at the end of the day
const currentHour = dayjs().hour();

if (currentHour >= 18) {
  localStorage.clear();
}


});
