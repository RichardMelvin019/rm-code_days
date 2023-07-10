#include <stdio.h>

int main(int argc, char *argv[])
{
	int i;

	printf("argc = %d\n", argc);
	if (argc > 1)
	{
		printf("Lets see what is in argc\n");
		for (i = 0; i < argc; i++)
		{
			printf("argv[%d] = %s\n", i, argv[i]);
		}
	}
       	return (0);
}
