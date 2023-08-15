#include <stdio.h>
#include <string.h>

int main(void)
{
	char str[] = "My name is Melvin.";
	char split[] = " ";

	char *p = strtok(str, split);
	while (p != NULL)
	{
		printf("%s\n", p);
		p = strtok(NULL, split);
	}
	/*
	char *p1 = strtok(str, split);
	printf("%s\n", p1);
	char *p2 = strtok(NULL, split);
	printf("%s\n", p2);
	char *p3 = strtok(NULL, split);
	printf("%s\n", p3);
	char *p4 = strtok(NULL, split);
	printf("%s\n", p4);
	char *p5 = strtok(NULL, split);
	if (p5 == NULL)
		printf("No more string to split\n");
	else
		printf("still more\n");
	*/

	return (0);
}
