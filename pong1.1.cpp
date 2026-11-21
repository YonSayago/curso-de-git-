#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <conio.h>

#define V 21
#define H 75

// Prototipos de funciones
void inicio(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA);
void draw(char campo[V][H]);
void game_loop(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA, int modX, int modY, int modIA);
void input(char campo[V][H], int *pelX, int *pelY, int *iniJug, int *finJug, int *iniIA, int *finIA, int *modX, int *modY, int *modIA, int *gol);
void update(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA);

int main() {
    int pelX = 37, pelY = 10;
    int iniJug = 8, finJug = 12;
    int iniIA = 8, finIA = 12;
    int modX = -1, modY = -1;
    int modIA = -1;
    char campo[V][H];

    inicio(campo, pelX, pelY, iniJug, finJug, iniIA, finIA);
    game_loop(campo, pelX, pelY, iniJug, finJug, iniIA, finIA, modX, modY, modIA);

    return 0;
}

void hideCursor() {
    HANDLE consoleHandle = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO info;
    info.dwSize = 100;
    info.bVisible = FALSE;
    SetConsoleCursorInfo(consoleHandle, &info);
}

void inicio(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA) {
    int i, j;
    for (i = 0; i < V; i++) {
        for (j = 0; j < H; j++) {
            if (i == 0 || i == V - 1) {
                campo[i][j] = '-';
            } else if (j == 0 || j == H - 1) {
                campo[i][j] = '|';
            } else if (j == 2 && i >= iniJug && i <= finJug) {
                campo[i][j] = '|';
            } else if (j == H - 3 && i >= iniIA && i <= finIA) {
                campo[i][j] = '|';
            } else if (i == pelY && j == pelX) {
                campo[i][j] = 'O';
            } else {
                campo[i][j] = ' ';
            }
        }
    }
}

void draw(char campo[V][H]) {
    system("cls");
    int i, j;
    for (i = 0; i < V; i++) {
        for (j = 0; j < H; j++) {
            printf("%c", campo[i][j]);
        }
        printf("\n");
    }
}

void game_loop(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA, int modX, int modY, int modIA) {
    int gol = 0;

    do {
        draw(campo);
        input(campo, &pelX, &pelY, &iniJug, &finJug, &iniIA, &finIA, &modX, &modY, &modIA, &gol);
        update(campo, pelX, pelY, iniJug, finJug, iniIA, finIA);
        Sleep(20);
    } while (gol == 0);
}

void input(char campo[V][H], int *pelX, int *pelY, int *iniJug, int *finJug, int *iniIA, int *finIA, int *modX, int *modY, int *modIA, int *gol) {
    char key;

    // Colisión de la pelota con bordes superior e inferior
    if (*pelY == 1 || *pelY == V - 2) {
        *modY *= -1;
    }

    // Colisión de la pelota con las raquetas
    if (*pelX == 3 && *pelY >= *iniJug && *pelY <= *finJug) {
        *modX *= -1;
    }
    if (*pelX == H - 4 && *pelY >= *iniIA && *pelY <= *finIA) {
        *modX *= -1;
    }

    // Detección de gol
    if (*pelX == 1 || *pelX == H - 2) {
        *gol = 1;
    }

    // Control de rebote vertical de la IA
    if (*iniIA == 1 || *finIA == V - 2) {
        *modIA *= -1;
    }

    // Actualización de posiciones si no se ha marcado gol
    if (*gol == 0) {
        // Movimiento de la pelota
        *pelX += *modX;
        *pelY += *modY;

        // Movimiento de la IA
        *iniIA += *modIA;
        *finIA += *modIA;

        // Movimiento del jugador (teclas '8' arriba, '2' abajo) mediante kbhit()
        if (kbhit()) {
            key = getch();
            if (key == '8' && *iniJug > 1) {
                *iniJug -= 1;
                *finJug -= 1;
            } else if (key == '2' && *finJug < V - 2) {
                *iniJug += 1;
                *finJug += 1;
            }
        }
    }
}

void update(char campo[V][H], int pelX, int pelY, int iniJug, int finJug, int iniIA, int finIA) {
    inicio(campo, pelX, pelY, iniJug, finJug, iniIA, finIA);
}