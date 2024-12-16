import { forwardRef } from 'react'
import { useLayoutContext } from '#app/utils/layout-provider'
import { CallToAction } from './call-to-action'
import { NavLinks } from './nav-links'
import { Button } from './ui/button'
import { Icon } from './ui/icon'
import { SheetClose as SheetCloseOriginal } from './ui/sheet'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface SideNavigationProps {
	isSheet?: boolean
}

export function SideNavigation({ isSheet }: SideNavigationProps) {
	const { toggleNav } = useLayoutContext()
	const SheetClose = isSheet
		? forwardRef<HTMLDivElement, { children: React.ReactNode }>(
				(props, ref) => (
					<SheetCloseOriginal asChild>
						<div ref={ref}>{props.children}</div>
					</SheetCloseOriginal>
				),
			)
		: forwardRef<HTMLDivElement, { children: React.ReactNode }>(
				(props, ref) => <div ref={ref}>{props.children}</div>,
			)

	return (
		<div className="bg-surface relative h-full w-full flex-1 items-start">
			{/* This provides context  to users with disabilities */}
			<h2 className="clip-rect(0,0,0,0) overflow-wrap-normal absolute m-[-1px] h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">
				Navigation and recent journal entries
			</h2>
			{/* Nav container */}
			<div className="h-full w-full flex-1 items-start">
				<nav className="flex h-full w-full flex-col px-3">
					{/* Nav Header */}
					<div className="md:h-header-height flex h-[60px] items-center justify-between">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<SheetClose>
										{isSheet ? (
											<Button variant="ghost" size="icon">
												<Icon name="x" className="h-6 w-6" />
												<span className="sr-only">Close sidebar</span>
											</Button>
										) : (
											<Button variant="ghost" size="icon" onClick={toggleNav}>
												<Icon name="panel-right-close" className="h-6 w-6" />
												<span className="sr-only">Close navigation</span>
											</Button>
										)}
									</SheetClose>
								</TooltipTrigger>
								<TooltipContent side="top">Close sidebar</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon">
										<Icon name="notebook-pen" className="h-6 w-6" />
										<span className="sr-only">New journnal entry</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="top">New journnal entry</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					{/* Scrollable nav area */}
					<div className="relative -mr-2 flex-1 flex-col overflow-y-auto pr-2 transition-opacity duration-500">
						<NavLinks />
					</div>
					{/* Nav footer */}
					<div className="flex flex-col py-2 empty:hidden">
						<CallToAction />
					</div>
				</nav>
			</div>
		</div>
	)
}
