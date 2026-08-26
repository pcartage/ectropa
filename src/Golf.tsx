import { useState } from "react";
import { holePars, qualifier } from "./golf-data";
import { computeGolfStats, formatCounts, type RoundCard } from "./golf-stats";
import {
  computeStandings,
  formatStatus,
  formatToPar,
  isUnderParRound,
  isUnderToPar,
} from "./golf-standings";

const standings = computeStandings();
const stats = computeGolfStats();

function ScoreNine({
  title,
  start,
  holes,
}: {
  title: string;
  start: number;
  holes: number[];
}) {
  const scores = holes.slice(start, start + 9);
  const pars = holePars.slice(start, start + 9);
  const parSum = pars.reduce((sum, n) => sum + n, 0);
  const scoreSum = scores.reduce((sum, n) => sum + n, 0);
  return (
    <table className="golf-card">
      <thead>
        <tr>
          <th scope="row">{title}</th>
          {pars.map((_, i) => (
            <th key={start + i + 1} scope="col">{start + i + 1}</th>
          ))}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Par</th>
          {pars.map((par, i) => (
            <td key={i}>{par}</td>
          ))}
          <td>{parSum}</td>
        </tr>
        <tr>
          <th scope="row"></th>
          {scores.map((score, i) => (
            <td key={i} className={score < pars[i] ? "under" : undefined}>{score}</td>
          ))}
          <td>{scoreSum}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Tarjeta({
  name,
  cards,
  tab,
  onTab,
}: {
  name: string;
  cards: RoundCard[];
  tab: number;
  onTab: (dateIndex: number) => void;
}) {
  const card = cards.find((item) => item.dateIndex === tab) ?? cards[0];
  if (!card) return null;
  return (
    <section className="golf-tarjeta" id="golf-tarjeta" aria-label={`Tarjeta de ${name}`}>
      <p className="golf-tarjeta-kicker">Tarjeta</p>
      <h2>{name}</h2>
      {cards.length > 1 ? (
        <div className="golf-card-tabs" role="tablist" aria-label="Fechas">
          {cards.map((item) => (
            <button
              key={item.dateIndex}
              type="button"
              role="tab"
              aria-selected={item.dateIndex === card.dateIndex}
              onClick={() => onTab(item.dateIndex)}
            >
              {item.dateLabel}
            </button>
          ))}
        </div>
      ) : (
        <p className="golf-tarjeta-date">{card.dateLabel}</p>
      )}
      {card.holes && card.counts ? (
        <>
          <div className="golf-cards">
            <ScoreNine title="Ida" start={0} holes={card.holes} />
            <ScoreNine title="Vuelta" start={9} holes={card.holes} />
          </div>
          <p className="golf-tarjeta-counts">{formatCounts(card.counts)}</p>
        </>
      ) : (
        <>
          <p className="golf-tarjeta-total">{card.total}</p>
          <p className="golf-sin-hoyos">Sin hoyos</p>
        </>
      )}
    </section>
  );
}

export default function Golf() {
  const [openName, setOpenName] = useState<string | null>(null);
  const [tab, setTab] = useState(0);

  function togglePlayer(name: string) {
    setOpenName((current) => {
      if (current === name) return null;
      const cards = stats.byName[name]?.cards ?? [];
      const holeCard = cards.find((card) => card.holes);
      setTab((holeCard ?? cards[0])?.dateIndex ?? 0);
      return name;
    });
  }

  const openCards = openName ? stats.byName[openName]?.cards ?? [] : [];

  return (
    <div className="golf-page">
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <header className="golf-masthead">
        <p className="wordmark">Ectropa</p>
        <h1>{qualifier.event}</h1>
        <p className="golf-dek">{qualifier.dek}</p>
        <p className="golf-rules">
          Mejores {qualifier.bestOf} de {qualifier.dates.length} · {qualifier.autoQualify} cupos automáticos + {qualifier.captainPicks} elecciones del capitán · máximo {qualifier.maxJuniors} juveniles
        </p>
        <p className="golf-rules">Capitán: {qualifier.captain}</p>
        {stats.highlights.length > 0 ? (
          <ul className="golf-destacados">
            {stats.highlights.map((chip) => (
              <li className="golf-chip" key={chip.key}>
                <span className="golf-chip-label">{chip.label}</span>
                <span className="golf-chip-detail">{chip.detail}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {stats.campoLine ? <p className="golf-campo">{stats.campoLine}</p> : null}
      </header>
      <main id="main">
        <div className="golf-board-wrap">
          <table className="golf-board">
            <caption className="sr-only">
              Clasificatorio {qualifier.event}, juego por golpes bruto, par {qualifier.par}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="col-pos">Pos</th>
                <th scope="col" className="col-player">Jugador</th>
                <th scope="col" className="col-num">Al par</th>
                <th scope="col" className="col-num">Mejores 4</th>
                <th scope="col" className="col-num">Jugadas</th>
                {qualifier.dates.map((date) => (
                  <th scope="col" className="col-round" key={date.id}>{date.label}</th>
                ))}
                <th scope="col" className="col-status">Estado</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.player.name} className={row.cutAfter ? "cut-after" : undefined}>
                  <td className="col-pos">{row.posLabel}</td>
                  <td className="col-player">
                    <button
                      type="button"
                      className="golf-player-btn"
                      aria-expanded={openName === row.player.name}
                      aria-controls="golf-tarjeta"
                      onClick={() => togglePlayer(row.player.name)}
                    >
                      {row.player.name}
                    </button>
                    {row.player.junior ? <abbr className="golf-jr" title="Juvenil">Juv</abbr> : null}
                  </td>
                  <td className={isUnderToPar(row.toPar) ? "col-num under" : "col-num"}>
                    {formatToPar(row.toPar)}
                  </td>
                  <td className="col-num">{row.best4 ?? ""}</td>
                  <td className="col-num">{row.played}</td>
                  {row.player.rounds.map((score, index) => (
                    <td
                      key={qualifier.dates[index].id}
                      className={isUnderParRound(score) ? "col-round under" : "col-round"}
                    >
                      {score ?? ""}
                    </td>
                  ))}
                  <td className={`col-status status-${row.status}`}>{formatStatus(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {openName && openCards.length > 0 ? (
          <Tarjeta name={openName} cards={openCards} tab={tab} onTab={setTab} />
        ) : null}
        <p className="golf-note">
          Planilla oficial · 15 ago y 16 ago 2026 · las cuatro fechas restantes por definir
        </p>
      </main>
    </div>
  );
}
