select row_number() over (order by round( (sum(ffp) / (sum(gplayed) + 0.000001))::numeric, 2) desc) as rownum,
    player,
    playerident,
  array_to_string(array_agg(distinct tpposition),', ') as positions,
	curteam as teams,
	MAX(age) as age,
  contract,
	bye,
	sum(gplayed) AS gamesplayed,
	round((sum(ffp) / (sum(gplayed)::numeric + 0.000001)::double precision )::numeric, 2)  AS fantasyppg,
	sum( ffp) AS ffp,
	max( ffp) AS pceiling,
  min( ffp) FILTER (WHERE  gplayed = 1) AS pfloor,
	sum( tds) AS tds,

  sum(rtars) AS targets,
  sum(pyd) AS pyd,
	sum(patts) AS passingattempts,
	sum(passc) AS passingcompletions,
  round(((sum(passc)/(sum(patts)+0.00001))*100)::numeric, 1) as passcomppercent,
	sum( ruyd) + sum( reyd) + sum( pyd) AS scrimmageyards,
	round(((sum( ruyd) + sum( reyd) + sum( pyd)) / (sum( gplayed)::numeric + 0.00001)::double precision)::numeric, 2) AS passyardsscrimmageypg,
	sum(ruyd) AS ruyd,
  round((sum(pyd)/(sum(gplayed)+0.000001))::numeric, 1) as pydpergame,
	round((sum(pyd)/(sum(passc)+0.001))::numeric, 2) as passyardcomp,
  round((sum(ruyd)/(sum(gplayed)+0.000001))::numeric, 1) as ruydpergame,
	round((sum(ruyd)/(sum(ratts)+0.000001))::numeric, 1) as ruydpercarry,
	round((sum(reyd)/(sum(gplayed)+0.000001))::numeric, 1) as reydpergame,
	round((sum(reyd)/(sum(recp)+0.000001))::numeric, 1) as reydpercompletion,
    round((sum(reyd)/(sum(rtars)+0.000001))::numeric, 1) as reydperattempt,
	sum(reyd) AS reyd,
	sum(recp) AS receptions,
	(sum(patts) + sum(ratts) + sum(rtars)) AS actions,
	sum(tplus) as twentyplus,
  sum(f20s) AS fgtwentyplus,
	sum(f30s) AS fgthirtyplus,
  sum(f40s) AS fgfortyplus,
	sum(f50p) AS fgfiftyplus,
  max(lgy) as longyard,
	sum(fum) AS fumbles,
	sum(fuml) AS fumbleslost,
  sum(fga) AS fieldgoalattempted,
	sum(fgm) AS fieldgoalmade,
	round((sum(fgm)/(sum(fga)+0.000001))::numeric, 1) as fieldgoalpercent,
	sum(patattempt) AS pointafterattempted,
	sum(patmade) AS pointaftermade,
	round((sum(patmade)/(sum(patattempt)+0.000001))::numeric, 1) as pointafterpercent,
  sum(ratts) AS carries,
	sum(sacks) as sacks,
	sum(ratts5y) as carries5y,
	(sum(patts5y) + sum(ratts5y) + sum(rtars5y)) AS actions5y,
	sum(rtars5y) AS rtars5y,
	sum(td10y)  touchdowns10y,
	sum(td3y) AS touchdowns3y,
	0 as fglong, --Longest FG
    0 as fgblocked, --Blocked FG's
    0 as patblocked --Blocked PAT's

		from ${table~}
			--where (tpposition in ('QB','RB','WR','TE','K')
			--and nflseason in ('2017','2016','2015', '2014','2013','2012','2011','2010','2009','2008')
			--and seasonweeks in ('Weeks 1-6','Weeks 7-13','Weeks 14-16','NFL Playoffs')
			--and location in ('HOME','AWAY')
			--and playsurface in ('Grass','Turf') and inoutdoor in ('Indoor','Outdoor') and sng in ('T','F') and pgs in ('T','F') and ctemp in ('J','K','L','M','N','O')
			--and regseason in(1,3))
			where ${where^}
		group by player, contract, bye, playerident, curteam
		order by ${orderBy^} round( (sum(ffp) / (sum(gplayed) + 0.000001))::numeric, 2) desc
        ${limit^}