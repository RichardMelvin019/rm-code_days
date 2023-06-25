#include <stdio.h>
/**
 * main - Entry point
 *
 * Return: 0
 */
int main(void)
{
	int n = 2345;
	int x;

	x = n % 10;
	printf("last digit of n: %d is %d\n", n, x);
}
