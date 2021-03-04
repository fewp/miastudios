export default () => {
  const date = new Date();

  let day = date.getDay().toString();
  let month = (date.getMonth() + 1).toString(); // for some reasons it starts at 0, so you need to add +1 to get the right month

  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();

  let betterDate = `${day.length === 1 ? `0${day}` : day}/${
    month.length === 1 ? `0${month}` : month
  }/${date.getFullYear()} - ${hour.length === 1 ? `0${hour}` : hour}:${
    minute.length === 1 ? `0${minute}` : minute
  }:${second.length === 1 ? `0${second}` : second}`;

  return betterDate;
};
