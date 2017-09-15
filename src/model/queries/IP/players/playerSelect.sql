select row_number() over (order by round( (sum(ffp) / (sum(gplayed) + 0.000001))::numeric, 2) desc) as rownum,
    player,
    playerident,
  array_to_string(array_agg(distinct tpposition),', ') as positions,
	curteam as teams,
	MAX(age) as age,
  contract,
	bye,
	sum(gplayed) AS gamesplayed,
	round((sum(ffp) / (sum(gplayed)::numeric + 0.000001)::double precision )::numeric, 2) AS fantasyppg,
	sum( ffp) AS ffp,
	max( ffp) AS pceiling,
  min( ffp) FILTER (WHERE  gplayed = 1) AS pfloor,
	sum( tds) AS tds,

  sum(rtars) AS targets,
  sum(pyd) AS pyd,
	sum(patts) AS passingattempts,
	sum(passc) AS passingcompletions,
  round(((sum(passc)/(sum(patts)+0.00001))*100)::numeric, 1) as passcomppercent,
  sum(inter) as totalinterceptions,
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
	sum(ratts) AS carries,
	sum(osnaps) AS offensivesnaps,
	sum(tplus) as twentyplus,
	sum(fplus) as fortyplus,
  sum(f20s) AS fgtwentyplus,
	sum(f30s) AS fgthirtyplus,
  sum(f40s) AS fgfortyplus,
	sum(f50p) AS fgfiftyplus,
	sum(f60p) AS fgsixtyplus,
  max(lgy) as longyard,
	sum(fum) AS fumbles,
	sum(fuml) AS fumbleslost,
  sum(fga) AS fieldgoalattempted,
	sum(fgm) AS fieldgoalmade,
	round((sum(fgm)/(sum(fga)+0.000001))::numeric, 1) as fieldgoalpercent,
	sum(patattempt) AS pointafterattempted,
	sum(patmade) AS pointaftermade,
	round((sum(patmade)/(sum(patattempt)+0.000001))::numeric, 1) as pointafterpercent,
    sum(fgsblocked) AS fgblocked,
	sum(epblocked) AS patblocked

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