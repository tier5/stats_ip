SELECT
  hometeam,
  awayteam,
  hometeamkey,
  awayteamkey,
  timeincrement,
  stadiumname,
  starthour,
  startminute,
  ampm,
  dateofgame,
  hometeam,
  awayteam,
  temperature,
  graphic,
  windspeed,
  winddirection,
  wconditions,
  nightorday,
  chanceofpercipitation,
  humidity,
  timevalue
FROM weathertable
WHERE weatherkey = ${weatherKey}
ORDER BY timevalue