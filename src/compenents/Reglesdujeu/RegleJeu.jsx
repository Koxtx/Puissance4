import React from "react";
import styles from "./RegleJeu.module.scss";

export default function RegleJeu() {
  return (
    <div className={`d-flex flex-column flex-fill center m-10 ${styles.regle}`}>
      <h1>Règles du jeu Puissance 4</h1>
      <p>
        <strong>Objectif du jeu :</strong> Alignez 4 de vos jetons de couleur en
        ligne, que ce soit horizontalement, verticalement ou en diagonale.
      </p>
      <h2>Matériel :</h2>
      <ul>
        <li>Un plateau de jeu composé de 6 rangées et 7 colonnes.</li>
        <li>
          Deux couleurs de jetons (généralement rouge et jaune) en nombre
          suffisant pour chaque joueur.
        </li>
      </ul>
      <h2>Déroulement du jeu :</h2>
      <ol>
        <li>Les joueurs choisissent chacun une couleur de jetons.</li>
        <li>
          Les joueurs décident qui commence. Le jeu se déroule ensuite en
          alternance.
        </li>
        <li>
          À chaque tour, un joueur choisit une colonne et place un jeton dans la
          colonne choisie. Le jeton tombe jusqu'à la position la plus basse
          disponible dans cette colonne.
        </li>
        <li>Le joueur suivant répète l'opération dans une autre colonne.</li>
      </ol>
      <h2>Fin de la partie :</h2>
      <p>
        La partie se termine lorsqu'un joueur parvient à aligner 4 jetons de sa
        couleur en ligne (horizontalement, verticalement ou en diagonale) ou
        lorsque toutes les colonnes sont pleines, ce qui entraîne une égalité.
      </p>
      <h2>Règles supplémentaires :</h2>
      <ul>
        <li>
          Les joueurs ne peuvent pas retirer de jetons une fois qu'ils ont été
          placés dans le plateau.
        </li>
        <li>
          En cas d'égalité, le jeu peut être recommencé ou les joueurs peuvent
          convenir d'un autre résultat.
        </li>
      </ul>
    </div>
  );
}
