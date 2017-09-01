import $ from 'jquery';

const getEncounters = new Promise((resolve, reject) => {
  $.ajax({
    url: "https://red-wdp-api.herokuapp.com/api/mars/encounters",
    method: "GET"
  })
    .done((data) => {
      if (data.status === "encounters") {
        resolve(data);
      }
      else {
        reject();
      }
    })
    .fail((err) => {
      reject(err);
    });
});
export {getEncounters};
