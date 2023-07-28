#include <stdio.h>
#include "melvin.h"

int main()
{
	int score;
	printf("input your score: ");
	scanf("%d\n", &score);
	printf("Your Grade is: ");
	_grade(score);
	return (0);
}

int _grade(int score)
{
	switch (score)
	{
		case 70 ... 100:
			printf("A\n");
			break;
		case 60 ... 69:
			printf("B\n");
			break;
		case 50 ... 59:
			printf("C\n");
			break;
		case 45 ... 49:
			printf("D\n");
			break;
		case 40 ... 44:
			printf("E\n");
			break;
		case 0 ... 39:
			printf("F\n");
			break;
		default:
			printf("invalid input\n");
	}
	return (score);
}
