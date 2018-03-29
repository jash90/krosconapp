package com.example.zimny.listproducts;

public class BoardGame {
    private String name;
    private int difficulty;
    private int minplayers;
    private int maxplayers;
    private int minage;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public int getMinplayers() {
        return minplayers;
    }

    public void setMinplayers(int minplayers) {
        this.minplayers = minplayers;
    }

    public int getMaxplayers() {
        return maxplayers;
    }

    public void setMaxplayers(int maxplayers) {
        this.maxplayers = maxplayers;
    }

    public int getMinage() {
        return minage;
    }

    public void setMinage(int minage) {
        this.minage = minage;
    }

    public BoardGame() {
    }

    public BoardGame(String name, int difficulty, int minplayers, int maxplayers, int minage) {
        this.name = name;
        this.difficulty = difficulty;
        this.minplayers = minplayers;
        this.maxplayers = maxplayers;
        this.minage = minage;
    }

    @Override
    public String toString() {
        return "BoardGame{}";
    }
}
