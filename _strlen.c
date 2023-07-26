#include <stdio.h>
#include "melvin.h"

int main(int argc, char *argv[])
{
	if (argc == 2)
	{
		int name_length = _strlen(argv[1]);
		printf("The length of the name is: %d\n", name_length);
	}
	else
	{
		printf("input one argument\n");
	}
	return (0);
}




int _strlen(char *string)
{
	int count = 0;

	while (string[count] != '\0')
	{
		count++;
	}
	return (count);
}
