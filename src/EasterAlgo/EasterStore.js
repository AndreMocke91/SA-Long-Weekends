import { observable, computed } from 'mobx';
import dateFormat from 'dateformat';

import {
  FirstTwoDigitTable,
  FollowingSundayTable,
  LastTwoDigitsTable,
  PaschalFullMoonDates,
  PaschalFullMoon,
  SAHolidays,
} from './Tables';

import { Rules } from './Rules';

export class EasterStore {

  @observable holidays = [];

  @computed
  get AllHolidays() {
    return this.holidays.sort().map(holiday => {
      const satisfied = false;
      for (const rule of Rules) {
        if (rule(holiday, this.holidays.sort())) {
          satisfied = true;
          break;
        }
      }

      const resultObject = {
        date: dateFormat(new Date(holiday), "dddd, mmmm dS"),
        color: (satisfied) ? "#4EB" : "#DDD",
      }

      return resultObject
    });
  }

  onEnterYear = (event) => {
    if (event.target.value.length === 4) {
      this.holidays = [];
      const year = event.target.value;
      this.getEasterHolidays(year);
      this.pushStaticHolidays(year);
    }
  }

  pushStaticHolidays = (year) => {
    for (const holiday of SAHolidays) {
      this.holidays.push(new Date(year.toString() + holiday).getTime());
    }
  }

  getEasterHolidays = (year) => {
    const threeDigits = (year / 19).toString().substr((year / 19).toString().indexOf('.'), 4);
    if (threeDigits.length < 2) {
      threeDigits = ".0";
    }
    const pfm = PaschalFullMoon[`${threeDigits}`] || 1;
    const numberA = this.getValueFromTable(pfm, PaschalFullMoonDates);

    const firstTwoDigits = year.toString().substr(0, 2);
    let numberB = this.getValueFromTable(firstTwoDigits, FirstTwoDigitTable);;

    const lastTwoDigits = year.toString().substr(2);
    const numberC = this.getValueFromTable(lastTwoDigits, LastTwoDigitsTable);

    const sum = parseInt(numberA) + parseInt(numberB) + parseInt(numberC);
    const daysToAddToSunday = this.getValueFromTable(sum, FollowingSundayTable);

    let month = (pfm.substr(0, 1) === "A") ? "April" : "March";
    let dayOfMonth = parseInt(pfm.substr(1)) + parseInt(daysToAddToSunday);

    if (dayOfMonth > 31) {
      month = "April";
      dayOfMonth = 1;
    }

    const easterSunday = new Date(`${year} ${month} ${dayOfMonth}`);
    const easterMonday = new Date(easterSunday).setDate(easterSunday.getDate() + 1);
    const goodFriday = new Date(easterSunday).setDate(easterSunday.getDate() - 2);

    this.holidays.push(goodFriday, easterMonday);
  }

  getValueFromTable = (value, table) => {
    const keys = Object.keys(table);
    for (const key of keys) {
      const values = table[key];
      if (values.includes(value)) {
        return key;
      }
    }
  }

}