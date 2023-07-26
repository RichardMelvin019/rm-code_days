#include <stdio.h>

int main(int argc, char *argv[])
{
	// check if 2 arguments were passed
	if (argc == 2)
	{
		printf("Hi %s, Welcome to %s \n", argv[1], argv[0]);
	}
	else
	{
		printf("Sorry, try entering two arguments\n");
	}
	return (0);
}
