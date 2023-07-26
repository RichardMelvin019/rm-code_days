#include <stdio.h>
/**
 * main - Entry point
 *
 * Return: 0
 */
int main(void)
{
	int n = 10;
	int x;

	while (n < 20)
	{
		for (x = 0; x < 20; x++)
		{
			printf("#");
		}
		printf("\n");
		n++;
	}
}
