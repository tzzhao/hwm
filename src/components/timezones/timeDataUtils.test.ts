import { REWARD_TIME, getTimeRowData } from "./timeDataUtils";


test('should order timezones from closest to furthest to reward time', () => {
    const nextTimeZoneToGetReward = +3; 

    const time = getDate(REWARD_TIME - 1 - nextTimeZoneToGetReward, 14, 49).getTime();
    const result = getTimeRowData(time);
    expect(result[0].label).toBe("GMT+3")
    expect(result[result.length - 1].label).toBe("GMT+4")
})

test('should order timezones from closest to furthest to reward time on the hour changes', () => {
    const nextTimeZoneToGetReward = +3; 

    let time = getDate(REWARD_TIME - 1 - nextTimeZoneToGetReward, 59, 59).getTime();
    let result = getTimeRowData(time);
    expect(result[0].label).toBe("GMT+3")
    expect(result[0].time).toBe("19:59:59")

    time = getDate(REWARD_TIME - 1 - nextTimeZoneToGetReward + 1, 0, 0).getTime();
    result = getTimeRowData(time);
    expect(result[0].label).toBe("GMT+2")
    expect(result[0].time).toBe("19:00:00")
    expect(result[result.length-1].label).toBe("GMT+3")
    expect(result[result.length-1].time).toBe("20:00:00")
})

test('should have dual timezones for GMT-11/+13 and GMT-10/+14', () => {
    const result = getTimeRowData(Date.now());
    expect(result.find(e => e.label === 'GMT-11/+13')).toBeDefined();
    expect(result.find(e => e.label === 'GMT-10/+14')).toBeDefined();
})

function getDate(hours: number, minutes: number, seconds: number) {
    const date = new Date();
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    date.setUTCSeconds(seconds);
    return date;
}